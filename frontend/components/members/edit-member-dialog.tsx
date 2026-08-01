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

import { Member } from "@/types/member";
import { MemberForm } from "./member-form";

interface Props {
  member: Member;
}

export function EditMemberDialog({
  member,
}: Props) {

  const [open, setOpen] =
    useState(false);

  return (
    <>
      <DropdownMenuItem
        onSelect={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        Editar
      </DropdownMenuItem>

      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>
              Editar socio
            </DialogTitle>
          </DialogHeader>

          <MemberForm
            member={member}
            onSuccess={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}