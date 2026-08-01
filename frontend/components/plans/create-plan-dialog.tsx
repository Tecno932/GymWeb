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

import { PlanForm } from "./plan-form";

export function CreatePlanDialog() {

  const [open, setOpen] =
    useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >

      <DialogTrigger asChild>

        <Button>
          Nuevo plan
        </Button>

      </DialogTrigger>

      <DialogContent>

        <DialogHeader>

          <DialogTitle>
            Crear plan
          </DialogTitle>

        </DialogHeader>

        <PlanForm
          onSuccess={() =>
            setOpen(false)
          }
        />

      </DialogContent>

    </Dialog>
  );
}