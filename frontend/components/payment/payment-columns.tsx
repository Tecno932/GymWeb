"use client";

import {
  useState,
} from "react";

import {
  ColumnDef,
} from "@tanstack/react-table";

import {
  MoreHorizontal,
} from "lucide-react";

import {
  Payment,
} from "@/types/payment";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Button,
} from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  EditPaymentDialog,
} from "./edit-payment-dialog";

import {
  useDeletePayment,
} from "@/hooks/use-delete-payment";


function formatDate(
  value: string,
) {
  return new Date(
    value,
  ).toLocaleDateString(
    "es-AR",
  );
}


function formatMoney(
  value: number | string,
) {
  return new Intl.NumberFormat(
    "es-AR",
    {
      style: "currency",
      currency: "ARS",
    },
  ).format(
    Number(value),
  );
}


function methodLabel(
  method: string,
) {
  switch (method) {
    case "CASH":
      return "Efectivo";

    case "TRANSFER":
      return "Transferencia";

    case "CARD":
      return "Tarjeta";

    default:
      return "Otro";
  }
}


function PaymentActions({
  payment,
}: {
  payment: Payment;
}) {

  const [
    editOpen,
    setEditOpen,
  ] = useState(false);

  const [
    deleteOpen,
    setDeleteOpen,
  ] = useState(false);

  const deleteMutation =
    useDeletePayment();


  function handleDelete() {
    deleteMutation.mutate(
      payment.id,
      {
        onSuccess: () => {
          setDeleteOpen(false);
        },
      },
    );
  }


  return (
    <>
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

          <DropdownMenuItem
            onSelect={() =>
              setEditOpen(true)
            }
          >
            Editar
          </DropdownMenuItem>


          <DropdownMenuItem
            className="text-destructive"
            onSelect={() =>
              setDeleteOpen(true)
            }
          >
            Eliminar
          </DropdownMenuItem>

        </DropdownMenuContent>

      </DropdownMenu>


      <EditPaymentDialog
        payment={payment}
        open={editOpen}
        onOpenChange={
          setEditOpen
        }
      />


      <AlertDialog
        open={deleteOpen}
        onOpenChange={
          setDeleteOpen
        }
      >

        <AlertDialogContent>

          <AlertDialogHeader>

            <AlertDialogTitle>
              ¿Eliminar este pago?
            </AlertDialogTitle>

            <AlertDialogDescription>
              Esta acción eliminará
              permanentemente el pago
              registrado. Esta acción
              no se puede deshacer.
            </AlertDialogDescription>

          </AlertDialogHeader>


          <AlertDialogFooter>

            <AlertDialogCancel
              disabled={
                deleteMutation.isPending
              }
            >
              Cancelar
            </AlertDialogCancel>


            <AlertDialogAction
              onClick={
                handleDelete
              }
              disabled={
                deleteMutation.isPending
              }
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending
                ? "Eliminando..."
                : "Eliminar"}
            </AlertDialogAction>

          </AlertDialogFooter>

        </AlertDialogContent>

      </AlertDialog>
    </>
  );
}


export const paymentColumns:
  ColumnDef<Payment>[] = [

  {
    id: "member",

    header: "Socio",

    cell: ({ row }) => {

      const payment =
        row.original;

      return (
        <div>

          <div className="font-medium">
            {payment.membership?.member
              ? `${payment.membership.member.firstName} ${payment.membership.member.lastName}`
              : "Socio desconocido"}
          </div>

          {payment.membership?.member?.dni && (
            <div className="text-xs text-muted-foreground">
              DNI:{" "}
              {payment.membership.member.dni}
            </div>
          )}

        </div>
      );
    },
  },


  {
    id: "plan",

    header: "Plan",

    cell: ({ row }) => (
      <span>
        {row.original.membership?.plan?.name ??
          "Sin plan"}
      </span>
    ),
  },


  {
    accessorKey: "amount",

    header: "Importe",

    cell: ({ row }) => (
      <span className="font-medium">
        {formatMoney(
          row.original.amount,
        )}
      </span>
    ),
  },


  {
    accessorKey: "method",

    header: "Método",

    cell: ({ row }) => (
      <Badge variant="secondary">
        {methodLabel(
          row.original.method,
        )}
      </Badge>
    ),
  },


  {
    accessorKey: "paidAt",

    header: "Fecha de pago",

    cell: ({ row }) =>
      formatDate(
        row.original.paidAt,
      ),
  },


  {
    accessorKey: "dueDate",

    header: "Vencimiento",

    cell: ({ row }) => {

      const dueDate =
        new Date(
          row.original.dueDate,
        );

      const today =
        new Date();

      const expired =
        dueDate < today;

      return (
        <Badge
          variant={
            expired
              ? "destructive"
              : "outline"
          }
        >
          {formatDate(
            row.original.dueDate,
          )}
        </Badge>
      );
    },
  },


  {
    id: "actions",

    header: "Acciones",

    cell: ({ row }) => (
      <PaymentActions
        payment={
          row.original
        }
      />
    ),
  },

];