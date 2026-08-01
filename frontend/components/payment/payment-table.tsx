"use client";

import { DataTable } from "@/components/common/data-table/data-table";

import { paymentColumns } from "./payment-columns";

import { Payment } from "@/types/payment";

interface Props {
  payments: Payment[];
}

export function PaymentTable({
  payments,
}: Props) {
  return (
    <DataTable
      columns={paymentColumns}
      data={payments}
    />
  );
}