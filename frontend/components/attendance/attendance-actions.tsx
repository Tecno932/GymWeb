"use client";

import {
  useCheckoutAttendance,
} from "@/hooks/use-checkout-attendance";

import {
  useDeleteAttendance,
} from "@/hooks/use-delete-attendance";

import {
  Button,
} from "@/components/ui/button";

import {
  Trash2,
  LogOut,
} from "lucide-react";

import {
  Attendance,
} from "@/types/attendance";

interface Props {
  attendance: Attendance;
}

export function AttendanceActions({
  attendance,
}: Props) {

  const checkoutMutation =
    useCheckoutAttendance();

  const deleteMutation =
    useDeleteAttendance();

  function handleCheckout() {

    checkoutMutation.mutate(
      attendance.id,
    );
  }

  function handleDelete() {

    const confirmed =
      window.confirm(
        "¿Seguro que deseas eliminar este registro de asistencia?",
      );

    if (!confirmed) {
      return;
    }

    deleteMutation.mutate(
      attendance.id,
    );
  }

  const isPending =
    checkoutMutation.isPending ||
    deleteMutation.isPending;

  return (
    <div className="flex items-center gap-2">

      {!attendance.checkOut && (
        <Button
          variant="outline"
          size="sm"
          onClick={
            handleCheckout
          }
          disabled={isPending}
        >
          <LogOut className="mr-2 h-4 w-4" />

          {checkoutMutation.isPending
            ? "Registrando..."
            : "Salida"}
        </Button>
      )}

      <Button
        variant="ghost"
        size="icon"
        onClick={
          handleDelete
        }
        disabled={isPending}
      >
        <Trash2 className="h-4 w-4 text-destructive" />
      </Button>

    </div>
  );
}