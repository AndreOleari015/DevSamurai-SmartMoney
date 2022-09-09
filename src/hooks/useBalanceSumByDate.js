import { useState } from "react"
import { useEffect } from "react/cjs/react.development";
import { getBalanceByDate } from "../services/Balance";

const useBalanceSumByDate = (days = 7) => {
    const [balanceSum, setBalanceSum] = useState([]);

    useEffect(() => {
        async function loadBalanceSumByDate() {
            const date = await getBalanceByDate(days);
            setBalanceSum([...date]);
        }

        loadBalanceSumByDate();
    }, [days]);
    return [balanceSum]
}

export default useBalanceSumByDate;