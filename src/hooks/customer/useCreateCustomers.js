import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createCustomer } from "../../pages/customer/customerApi"

export const useCreateCustomer = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: createCustomer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["customers"]})
        }
    })
}