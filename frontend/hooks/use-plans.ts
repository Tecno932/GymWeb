"use client";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  getPlans,
} from "@/services/plans";

export function usePlans() {

  return useQuery({

    queryKey: [
      "plans",
    ],

    queryFn: getPlans,

  });

}