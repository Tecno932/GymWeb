"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createPayment,
} from "@/services/payments";

import {
  PaymentFormValues,
} from "@/validations/payment-schema";

interface Options {
  onSuccess?: () => void;
}

export function useCreatePayment(
  options?: Options,
) {

  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      data: PaymentFormValues,
    ) =>
      createPayment(data),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: [
          "payments",
        ],
      });

      options?.onSuccess?.();
    },
  });
}