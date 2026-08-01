"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createMember,
} from "@/services/members";

import {
  MemberFormValues,
} from "@/validations/member-schema";

interface Options {
  onSuccess?: () => void;
}

export function useCreateMember(
  options?: Options,
) {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: (
      data: MemberFormValues,
    ) => createMember(data),

    onSuccess() {

      queryClient.invalidateQueries({
        queryKey: ["members"],
      });

      options?.onSuccess?.();

    },

  });

}