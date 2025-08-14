import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateCustomer } from "../../pages/customer/customerApi";

export const useUpdateCustomer = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateCustomer,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["customers"]})
        }
    })
}