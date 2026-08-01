"use client";

import { useQuery } from "@tanstack/react-query";

import { getMembers } from "@/services/members";

export function useMembersForAttendance() {
  return useQuery({
    queryKey: ["members", "attendance"],

    queryFn: () =>
      getMembers(
        1,
        100,
        "",
      ),
  });
}