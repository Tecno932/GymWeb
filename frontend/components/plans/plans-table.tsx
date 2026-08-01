"use client";

import { DataTable } from "@/components/common/data-table/data-table";

import { Plan } from "@/types/plan";

import { planColumns } from "./plans-columns";

interface Props {
  plans: Plan[];
}

export function PlansTable({
  plans,
}: Props) {

  return (
    <DataTable
      columns={planColumns}
      data={plans}
    />
  );
}