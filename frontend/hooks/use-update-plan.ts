"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  updatePlan,
} from "@/services/plans";

import {
  PlanFormValues,
} from "@/validations/plan-schema";

interface Options {
  onSuccess?: () => void;
}

export function useUpdatePlan(
  options?: Options,
) {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<PlanFormValues>;
    }) =>
      updatePlan(
        id,
        data,
      ),

    onSuccess() {

      queryClient.invalidateQueries({
        queryKey: ["plans"],
      });

      options?.onSuccess?.();

    },

  });

}