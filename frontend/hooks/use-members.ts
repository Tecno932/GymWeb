"use client";

import { useQuery } from "@tanstack/react-query";

import { getMembers } from "@/services/members";

export function useMembers(
  page: number,
  search: string,
) {
  return useQuery({
    queryKey: [
      "members",
      page,
      search,
    ],

    queryFn: () =>
      getMembers(
        page,
        10,
        search,
      ),

    placeholderData: (previous) => previous,
  });
}