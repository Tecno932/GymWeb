"use client";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  getMemberships,
} from "@/services/memberships";

export function useMemberships() {

  return useQuery({

    queryKey: [
      "memberships",
    ],

    queryFn:
      getMemberships,

  });

}