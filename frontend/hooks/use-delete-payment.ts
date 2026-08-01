"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  deletePayment,
} from "@/services/payments";

export function useDeletePayment() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      id: string,
    ) =>
      deletePayment(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "payments",
        ],
      });
    },
  });
}