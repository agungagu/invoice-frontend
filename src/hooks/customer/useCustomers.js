import { useQuery } from "@tanstack/react-query"
import { fetchCustomers } from "../../pages/customer/customerApi"


export const useCustomers = () => {
    return useQuery({
        queryKey: ["customers"],
        queryFn: fetchCustomers,
    })
}