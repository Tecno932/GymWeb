"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createAttendance,
} from "@/services/attendance";

interface Options {
  onSuccess?: () => void;
}

export function useCreateAttendance(
  options?: Options,
) {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      memberId: string,
    ) =>
      createAttendance(
        memberId,
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