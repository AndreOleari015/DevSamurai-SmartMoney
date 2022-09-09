import _, { sumBy } from "lodash";
import moment from "moment";
import { getRealm } from "./Realm";
import { v4 as uuidv4 } from "uuid";

import Colors from "../styles/Colors";


export const getBalance = async (untilDays = 0) => {
    const realm = await getRealm();

    let entries = realm.objects("Entry");

    if (untilDays > 0) {
        const date = moment().subtract(untilDays, 'days').toDate();
        entries = entries.filtered("entryAt < $0", date)
    }

    return entries.sum("amount");
}

export const getBalanceByDate = async (days) => {
    const realm = await getRealm();

    let entries = realm.objects("Entry")

    const startBalance = await getBalance();
    if (days > 0) {
        const date = moment().subtract(days, 'days').toDate();
        entries = entries.filtered("entryAt > $0", date)
    }
    entries = entries.sorted("entryAt")
    entries = _(entries)
        .groupBy(({ entryAt }) => moment(entryAt).format("YYYYMMDD"))
        .map(entry => _.sumBy(entry, "amount"))
        .map((amount, index, collection) => {
            return (
                (index === 0 ? startBalance : 0) +
                _.sum(_.slice(collection, 0, index)) +
                amount
            );
        })
    console.log("getBalanceByDate :: " + JSON.stringify(entries))
    return entries;

}
export const getBalanceByCateory = async (days, showOther = true) => {
    const realm = await getRealm();

    let entries = realm.objects("Entry");


    if (days > 0) {
        const date = moment().subtract(days, 'days').toDate();
        entries = entries.filtered("entryAt > $0", date)
    }
    entries = _(entries)
        .groupBy(({ category: { id } }) => id)
        .map(entry => ({
            category: _.omit(entry[0].category, "entries"),
            amount: Math.abs(_.sumBy(entry, "amount"))
        }))
        .filter(({ amount }) => amount > 0)
        .orderBy("amount", "desc");

    const othersLimit = 3;

    if (showOther && _(entries).size() > othersLimit) {
        const data1 = _(entries).slice(0, othersLimit);
        const data2 = [
            {
                category: { id: uuidv4(), name: "Outros", color: Colors.metal },
                amount: _(entries)
                    .slice(othersLimit)
                    .map(({ amount }) => amount)
                    .sum(),
            }
        ]
        entries = [...data1, ...data2];

    }
    console.log("getBalanceByCateory :: " + JSON.stringify(entries))

    return entries;

}