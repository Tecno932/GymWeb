"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createMembership,
} from "@/services/memberships";

import {
  MembershipFormValues,
} from "@/validations/membership-schema";

interface Options {
  onSuccess?: () => void;
}

export function useCreateMembership(
  options?: Options,
) {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: (
      data: MembershipFormValues,
    ) =>
      createMembership(
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