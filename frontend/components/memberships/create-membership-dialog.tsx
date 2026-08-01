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

import { MembershipForm } from "./membership-form";

export function CreateMembershipDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button>
          Nueva membresía
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            Crear membresía
          </DialogTitle>
        </DialogHeader>

        <MembershipForm
          onSuccess={() =>
            setOpen(false)
          }
        />
      </DialogContent>
    </Dialog>
  );
}