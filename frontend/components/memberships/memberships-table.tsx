"use client";

import { DataTable } from "@/components/common/data-table/data-table";

import { membershipColumns } from "./memberships-columns";

import { Membership } from "@/types/membership";

interface Props {
  memberships: Membership[];
}

export function MembershipsTable({
  memberships,
}: Props) {
  return (
    <DataTable
      columns={
        membershipColumns
      }
      data={memberships}
    />
  );
}