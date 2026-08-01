"use client";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  getAttendances,
} from "@/services/attendance";

export function useAttendances() {
  return useQuery({
    queryKey: [
      "attendance",
    ],

    queryFn:
      getAttendances,
  });
}