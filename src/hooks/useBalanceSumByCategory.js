import { useState } from "react"
import { useEffect } from "react/cjs/react.development";
import { getBalanceByCateory } from "../services/Balance";

const useBalanceSumByCateory = (days = 7) => {
    const [balanceSum, setBalanceSum] = useState([]);

    useEffect(() => {
        async function loadBalanceSumByCategory() {
            const date = await getBalanceByCateory(days);
            setBalanceSum([...date]);
        }

        loadBalanceSumByCategory();
    }, [days]);
    return [balanceSum]
}

export default useBalanceSumByCateory;