"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Member } from "@/types/member";
import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { EditMemberDialog } from "./edit-member-dialog";
import { ChangeMemberStatusDialog } from "./delete-member-dialog";

export const memberColumns: ColumnDef<Member>[] = [

  {
    accessorKey: "firstName",
    header: "Nombre",

    cell: ({ row }) => (
      <>
        {row.original.firstName}{" "}
        {row.original.lastName}
      </>
    ),
  },

  {
    accessorKey: "dni",
    header: "DNI",
  },

  {
    accessorKey: "phone",
    header: "Teléfono",
  },

  {
    accessorKey: "status",

    header: "Estado",

    cell: ({ row }) => (
      <Badge
        variant={
          row.original.status === "ACTIVE"
            ? "default"
            : "destructive"
        }
      >
        {row.original.status === "ACTIVE"
          ? "Activo"
          : "Inactivo"}
      </Badge>
    ),
  },

  {
    id: "actions",

    header: "Acciones",

    cell: ({ row }) => {

      const member = row.original;

      return (

        <DropdownMenu>

          <DropdownMenuTrigger asChild>

            <Button
              variant="ghost"
              size="icon"
            >

              <MoreHorizontal />

            </Button>

          </DropdownMenuTrigger>


          <DropdownMenuContent align="end">

            <DropdownMenuItem>
              Ver
            </DropdownMenuItem>


            <EditMemberDialog
            member={member}
            />


            <ChangeMemberStatusDialog
              member={member}
            />


          </DropdownMenuContent>

        </DropdownMenu>

      );

    },
  },
];