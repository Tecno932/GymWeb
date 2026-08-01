"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  checkoutAttendance,
} from "@/services/attendance";

interface Options {
  onSuccess?: () => void;
}

export function useCheckoutAttendance(
  options?: Options,
) {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      id: string,
    ) =>
      checkoutAttendance(
        id,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "attendance",
        ],
      });

      options?.onSuccess?.();
    },
  });
}