"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Button,
} from "@/components/ui/button";

import {
  Payment,
} from "@/types/payment";

import {
  PaymentForm,
} from "./payment-form";

interface Props {
  payment: Payment;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function EditPaymentDialog({
  payment,
  open: controlledOpen,
  onOpenChange,
}: Props) {
  const [internalOpen, setInternalOpen] =
    useState(false);

  const open =
    controlledOpen ??
    internalOpen;

  function setOpen(
    value: boolean,
  ) {
    if (onOpenChange) {
      onOpenChange(value);
    } else {
      setInternalOpen(value);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Editar pago
          </DialogTitle>
        </DialogHeader>

        <PaymentForm
          payment={payment}
          onSuccess={() =>
            setOpen(false)
          }
        />
      </DialogContent>
    </Dialog>
  );
}