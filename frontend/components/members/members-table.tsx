"use client";

import { DataTable } from "@/components/common/data-table/data-table";

import { memberColumns } from "./members-columns";

import { Member } from "@/types/member";

interface Props {
  members: Member[];
}

export function MembersTable({
  members,
}: Props) {
  return (
    <DataTable
      columns={memberColumns}
      data={members}
    />
  );
}