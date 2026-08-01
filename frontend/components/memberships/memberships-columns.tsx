"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Membership } from "@/types/membership";

import { EditMembershipDialog } from "./edit-membership-dialog";
import { ChangeMembershipStatusDialog } from "./change-membership-status-dialog";

function formatDate(
  value: string,
) {
  return new Intl.DateTimeFormat(
    "es-AR",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    },
  ).format(
    new Date(value),
  );
}

function formatPrice(
  value: number | string,
) {
  return new Intl.NumberFormat(
    "es-AR",
    {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    },
  ).format(
    Number(value),
  );
}

function getStatusLabel(
  status: string,
) {
  switch (status) {

    case "ACTIVE":
      return "Activa";

    case "EXPIRED":
      return "Vencida";

    case "CANCELLED":
      return "Cancelada";

    case "SUSPENDED":
      return "Suspendida";

    default:
      return status;

  }
}

function getStatusVariant(
  status: string,
) {

  switch (status) {

    case "ACTIVE":
      return "default" as const;

    case "EXPIRED":
      return "secondary" as const;

    default:
      return "destructive" as const;

  }

}

export const membershipColumns:
  ColumnDef<Membership>[] = [

  {
    id: "member",

    header: "Socio",

    cell: ({
      row,
    }) => {

      const membership =
        row.original;

      return (
        <div className="flex flex-col">

          <span className="font-medium">
            {membership.member
              ? `${membership.member.firstName} ${membership.member.lastName}`
              : "—"}
          </span>

          {membership.member?.dni && (
            <span className="text-xs text-muted-foreground">
              DNI:{" "}
              {membership.member.dni}
            </span>
          )}

        </div>
      );
    },
  },


  {
    id: "plan",

    header: "Plan",

    cell: ({
      row,
    }) => {

      return (
        <span>
          {row.original.plan?.name ??
            "—"}
        </span>
      );
    },
  },


  {
    accessorKey: "price",

    header: "Precio",

    cell: ({
      row,
    }) => {

      return (
        <span>
          {formatPrice(
            row.original.price,
          )}
        </span>
      );
    },
  },


  {
    accessorKey: "startDate",

    header: "Inicio",

    cell: ({
      row,
    }) => {

      return (
        <span>
          {formatDate(
            row.original.startDate,
          )}
        </span>
      );
    },
  },


  {
    accessorKey: "endDate",

    header: "Vencimiento",

    cell: ({
      row,
    }) => {

      return (
        <span>
          {formatDate(
            row.original.endDate,
          )}
        </span>
      );
    },
  },


  {
    accessorKey: "status",

    header: "Estado",

    cell: ({
      row,
    }) => {

      const status =
        row.original.status;

      return (
        <Badge
          variant={
            getStatusVariant(
              status,
            )
          }
        >
          {getStatusLabel(
            status,
          )}
        </Badge>
      );
    },
  },


  {
    id: "actions",

    header: "Acciones",

    cell: ({
      row,
    }) => {

      const membership =
        row.original;

      return (
        <DropdownMenu>

          <DropdownMenuTrigger
            asChild
          >

            <Button
              variant="ghost"
              size="icon"
            >

              <MoreHorizontal />

            </Button>

          </DropdownMenuTrigger>


          <DropdownMenuContent
            align="end"
          >

            <EditMembershipDialog
              membership={
                membership
              }
            />


            {membership.status ===
              "ACTIVE" && (

              <ChangeMembershipStatusDialog
                membership={membership}
              />

            )}

          </DropdownMenuContent>

        </DropdownMenu>
      );
    },
  },

];