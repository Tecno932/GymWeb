"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  deleteMembership,
} from "@/services/memberships";

interface Options {
  onSuccess?: () => void;
}

export function useDeleteMembership(
  options?: Options,
) {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: (
      id: string,
    ) =>
      deleteMembership(id),

    onSuccess() {

      queryClient.invalidateQueries({
        queryKey: [
          "memberships",
        ],
      });

      options?.onSuccess?.();

    },

  });

}