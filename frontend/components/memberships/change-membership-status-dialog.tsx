"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Membership } from "@/types/membership";

import { useDeleteMembership } from "@/hooks/use-delete-membership";

interface Props {
  membership: Membership;
}

export function ChangeMembershipStatusDialog({
  membership,
}: Props) {
  const [open, setOpen] =
    useState(false);

  const mutation =
    useDeleteMembership({
      onSuccess: () =>
        setOpen(false),
    });

  function handleConfirm() {
    mutation.mutate(
      membership.id,
    );
  }

  return (
    <>
      <Button
        variant="ghost"
        onClick={() =>
          setOpen(true)
        }
      >
        Finalizar
      </Button>

      <Dialog
        open={open}
        onOpenChange={
          setOpen
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Finalizar membresía
            </DialogTitle>
          </DialogHeader>

          <div className="py-4 text-sm text-muted-foreground">
            ¿Estás seguro de que
            querés finalizar la
            membresía de{" "}
            <strong>
              {membership.member
                ?.firstName}{" "}
              {membership.member
                ?.lastName}
            </strong>
            ?
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() =>
                setOpen(false)
              }
              disabled={
                mutation.isPending
              }
            >
              Cancelar
            </Button>

            <Button
              variant="destructive"
              onClick={
                handleConfirm
              }
              disabled={
                mutation.isPending
              }
            >
              {mutation.isPending
                ? "Finalizando..."
                : "Finalizar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}