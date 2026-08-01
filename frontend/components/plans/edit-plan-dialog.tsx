"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Plan } from "@/types/plan";

import { PlanForm } from "./plan-form";

interface Props {
  plan: Plan;
}

export function EditPlanDialog({
  plan,
}: Props) {

  const [open, setOpen] =
    useState(false);

  return (
    <>
      <DropdownMenuItem
        onSelect={(event) => {

          event.preventDefault();

          setOpen(true);

        }}
      >
        Editar
      </DropdownMenuItem>

      <Dialog
        open={open}
        onOpenChange={setOpen}
      >

        <DialogContent>

          <DialogHeader>

            <DialogTitle>
              Editar plan
            </DialogTitle>

          </DialogHeader>

          <PlanForm
            plan={plan}
            onSuccess={() =>
              setOpen(false)
            }
          />

        </DialogContent>

      </Dialog>
    </>
  );
}