"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  deleteMember,
} from "@/services/members";

interface Options {
  onSuccess?: () => void;
}

export function useDeleteMember(
  options?: Options,
) {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: (id: string) =>
      deleteMember(id),

    onSuccess() {

      queryClient.invalidateQueries({
        queryKey: ["members"],
      });

      options?.onSuccess?.();

    },

  });

}