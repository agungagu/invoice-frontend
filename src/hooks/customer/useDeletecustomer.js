import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCustomer } from "../../pages/customer/customerApi";

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};
