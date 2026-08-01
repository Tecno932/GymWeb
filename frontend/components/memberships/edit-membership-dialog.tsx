"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Membership } from "@/types/membership";

import { MembershipForm } from "./membership-form";

interface Props {
  membership: Membership;
}

export function EditMembershipDialog({
  membership,
}: Props) {
  const [open, setOpen] =
    useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
        >
          Editar
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            Editar membresía
          </DialogTitle>
        </DialogHeader>

        <MembershipForm
          membership={membership}
          onSuccess={() =>
            setOpen(false)
          }
        />
      </DialogContent>
    </Dialog>
  );
}