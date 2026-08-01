"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  deleteAttendance,
} from "@/services/attendance";

interface Options {
  onSuccess?: () => void;
}

export function useDeleteAttendance(
  options?: Options,
) {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      id: string,
    ) =>
      deleteAttendance(
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