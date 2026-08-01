"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createPlan,
} from "@/services/plans";

import {
  PlanFormValues,
} from "@/validations/plan-schema";

interface Options {
  onSuccess?: () => void;
}

export function useCreatePlan(
  options?: Options,
) {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: (
      data: PlanFormValues,
    ) =>
      createPlan(data),

    onSuccess() {

      queryClient.invalidateQueries({
        queryKey: ["plans"],
      });

      options?.onSuccess?.();

    },

  });

}