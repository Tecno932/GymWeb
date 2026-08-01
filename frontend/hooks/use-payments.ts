"use client";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  getPayments,
} from "@/services/payments";


export function usePayments(
  page: number,
  search: string,
) {

  return useQuery({

    queryKey: [
      "payments",
      page,
      search,
    ],


    queryFn: () =>
      getPayments(
        page,
        10,
        search,
      ),


    placeholderData:
      (previous) =>
        previous,

  });

}