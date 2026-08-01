"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  updatePayment,
} from "@/services/payments";

import {
  PaymentFormValues,
  UpdatePaymentValues,
} from "@/validations/payment-schema";

interface UpdatePaymentInput {
  id: string;
  data: UpdatePaymentValues;
}

interface Options {
  onSuccess?: () => void;
}

export function useUpdatePayment(
  options?: Options,
) {

  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: UpdatePaymentInput) =>
      updatePayment(
        id,
        data,
      ),

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