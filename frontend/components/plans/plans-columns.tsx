"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Plan } from "@/types/plan";

import { EditPlanDialog } from "./edit-plan-dialog";
import { ChangePlanStatusDialog } from "./change-plan-status-dialog";

export const planColumns: ColumnDef<Plan>[] = [

  {
    accessorKey: "name",

    header: "Nombre",
  },

  {
    accessorKey: "description",

    header: "Descripción",

    cell: ({ row }) => {

      const description =
        row.original.description;

      return (
        <span className="text-muted-foreground">
          {description || "Sin descripción"}
        </span>
      );
    },
  },

  {
    accessorKey: "durationDays",

    header: "Duración",

    cell: ({ row }) => (
      <span>
        {row.original.durationDays} días
      </span>
    ),
  },

  {
    accessorKey: "active",

    header: "Estado",

    cell: ({ row }) => {

      const active =
        row.original.active;

      return (
        <Badge
          variant={
            active
              ? "default"
              : "secondary"
          }
        >
          {active
            ? "Activo"
            : "Inactivo"}
        </Badge>
      );
    },
  },

  {
    id: "actions",

    header: "Acciones",

    cell: ({ row }) => {

      const plan =
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

            <EditPlanDialog
              plan={plan}
            />

            <ChangePlanStatusDialog
              plan={plan}
            />

          </DropdownMenuContent>

        </DropdownMenu>
      );
    },
  },
];