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

import { Member } from "@/types/member";

import {
  useDeleteMember,
} from "@/hooks/use-delete-member";

interface Props {
  member: Member;
}

export function ChangeMemberStatusDialog({
  member,
}: Props) {

  const [open, setOpen] =
    useState(false);

  const mutation =
    useDeleteMember({

      onSuccess() {
        setOpen(false);
      },

    });

  const isActive =
    member.status === "ACTIVE";

  return (
    <>
      <DropdownMenuItem
        className={
          isActive
            ? "text-destructive"
            : "text-green-600"
        }
        onSelect={(e) => {
          e.preventDefault();
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
                ? "¿Desactivar socio?"
                : "¿Activar socio?"}

            </AlertDialogTitle>

            <AlertDialogDescription>

              {isActive
                ? "El socio dejará de poder ingresar al gimnasio, pero conservará todo su historial."
                : "El socio volverá a estar habilitado para ingresar al gimnasio."}

            </AlertDialogDescription>

          </AlertDialogHeader>

          <AlertDialogFooter>

            <AlertDialogCancel>
              Cancelar
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={() =>
                mutation.mutate(member.id)
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