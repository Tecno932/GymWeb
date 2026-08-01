"use client";

import {
  ColumnDef,
} from "@tanstack/react-table";

import {
  Attendance,
} from "@/types/attendance";

import {
  Badge,
} from "@/components/ui/badge";

import {
  AttendanceActions,
} from "./attendance-actions";

function formatDate(
  value: string,
) {

  return new Date(
    value,
  ).toLocaleString(
    "es-AR",
    {
      dateStyle: "short",
      timeStyle: "short",
    },
  );
}

export const attendanceColumns:
  ColumnDef<Attendance>[] = [

  {
    id: "member",

    header: "Socio",

    cell: ({ row }) => {

      const member =
        row.original.member;

      if (!member) {
        return "Socio desconocido";
      }

      return (
        <div>

          <div className="font-medium">
            {member.firstName}{" "}
            {member.lastName}
          </div>

          {member.dni && (
            <div className="text-xs text-muted-foreground">
              DNI: {member.dni}
            </div>
          )}

        </div>
      );
    },
  },

  {
    accessorKey: "checkIn",

    header: "Entrada",

    cell: ({ row }) =>
      formatDate(
        row.original.checkIn,
      ),
  },

  {
    accessorKey: "checkOut",

    header: "Salida",

    cell: ({ row }) => {

      if (
        !row.original.checkOut
      ) {

        return (
          <Badge>
            Dentro
          </Badge>
        );
      }

      return formatDate(
        row.original.checkOut,
      );
    },
  },

  {
    id: "status",

    header: "Estado",

    cell: ({ row }) => {

      const active =
        !row.original.checkOut;

      return (
        <Badge
          variant={
            active
              ? "default"
              : "secondary"
          }
        >
          {active
            ? "Dentro"
            : "Finalizada"}
        </Badge>
      );
    },
  },

  {
    id: "actions",

    header: "Acciones",

    cell: ({ row }) => (
      <AttendanceActions
        attendance={
          row.original
        }
      />
    ),
  },

];