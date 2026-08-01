"use client";

import { useState } from "react";

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
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Plan } from "@/types/plan";

import {
  useDeletePlan,
} from "@/hooks/use-delete-plan";

interface Props {
  plan: Plan;
}

export function ChangePlanStatusDialog({
  plan,
}: Props) {

  const [open, setOpen] =
    useState(false);

  const mutation =
    useDeletePlan({
      onSuccess() {
        setOpen(false);
      },
    });

  const isActive =
    plan.active;

  return (
    <>
      <DropdownMenuItem
        className={
          isActive
            ? "text-destructive"
            : "text-green-600"
        }
        onSelect={(event) => {

          event.preventDefault();

          setOpen(true);

        }}
      >

        {isActive
          ? "Desactivar"
          : "Activar"}

      </DropdownMenuItem>


      <AlertDialog
        open={open}
        onOpenChange={setOpen}
      >

        <AlertDialogContent>

          <AlertDialogHeader>

            <AlertDialogTitle>

              {isActive
                ? "¿Desactivar plan?"
                : "¿Activar plan?"}

            </AlertDialogTitle>

            <AlertDialogDescription>

              {isActive
                ? "El plan dejará de estar disponible para nuevas membresías."
                : "El plan volverá a estar disponible para nuevas membresías."}

            </AlertDialogDescription>

          </AlertDialogHeader>


          <AlertDialogFooter>

            <AlertDialogCancel>
              Cancelar
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={() =>
                mutation.mutate(
                  plan.id,
                )
              }
            >

              {isActive
                ? "Desactivar"
                : "Activar"}

            </AlertDialogAction>

          </AlertDialogFooter>

        </AlertDialogContent>

      </AlertDialog>
    </>
  );
}