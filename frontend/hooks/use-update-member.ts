"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  updateMember,
} from "@/services/members";

import {
  MemberFormValues,
} from "@/validations/member-schema";

interface Options {
  onSuccess?: () => void;
}

export function useUpdateMember(
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
      data: MemberFormValues;
    }) =>
      updateMember(
        id,
        data,
      ),

    onSuccess() {

      queryClient.invalidateQueries({
        queryKey: ["members"],
      });

      options?.onSuccess?.();

    },

  });

}