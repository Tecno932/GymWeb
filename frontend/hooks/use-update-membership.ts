"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  updateMembership,
} from "@/services/memberships";

import {
  MembershipFormValues,
} from "@/validations/membership-schema";

interface Options {
  onSuccess?: () => void;
}

export function useUpdateMembership(
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

      data: Partial<
        MembershipFormValues
      >;
    }) =>
      updateMembership(
        id,
        data,
      ),

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