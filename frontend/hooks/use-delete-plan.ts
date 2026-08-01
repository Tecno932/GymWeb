"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  deletePlan,
} from "@/services/plans";

interface Options {
  onSuccess?: () => void;
}

export function useDeletePlan(
  options?: Options,
) {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: (
      id: string,
    ) =>
      deletePlan(id),

    onSuccess() {

      queryClient.invalidateQueries({
        queryKey: ["plans"],
      });

      options?.onSuccess?.();

    },

  });

}