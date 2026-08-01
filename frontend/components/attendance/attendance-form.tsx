"use client";

import {
  useForm,
} from "react-hook-form";

import {
  useMembersForAttendance,
} from "@/hooks/use-members-for-attendance";

import {
  useCreateAttendance,
} from "@/hooks/use-create-attendance";

import {
  Button,
} from "@/components/ui/button";

import {
  Label,
} from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormValues {
  memberId: string;
}

interface Props {
  onSuccess?: () => void;
}

export function AttendanceForm({
  onSuccess,
}: Props) {

  const {
    data: membersResponse,
    isLoading: membersLoading,
  } =
    useMembersForAttendance();

  const createMutation =
    useCreateAttendance({
      onSuccess,
    });

  const form =
    useForm<FormValues>({
      defaultValues: {
        memberId: "",
      },
    });

  function onSubmit(
    values: FormValues,
  ) {

    createMutation.mutate(
      values.memberId,
    );
  }

  const members =
    membersResponse?.items ?? [];

  return (
    <form
      onSubmit={form.handleSubmit(
        onSubmit,
      )}
      className="space-y-4"
    >

      <div className="space-y-2">

        <Label>
          Socio
        </Label>

        <Select
          value={form.watch(
            "memberId",
          )}
          onValueChange={(value) =>
            form.setValue(
              "memberId",
              value,
            )
          }
        >

          <SelectTrigger>

            <SelectValue
              placeholder={
                membersLoading
                  ? "Cargando socios..."
                  : "Seleccionar socio"
              }
            />

          </SelectTrigger>

          <SelectContent>

            {members
              .filter(
                (member) =>
                  member.status ===
                  "ACTIVE",
              )
              .map(
                (member) => (
                  <SelectItem
                    key={
                      member.id
                    }
                    value={
                      member.id
                    }
                  >
                    {member.firstName}{" "}
                    {member.lastName}

                    {member.dni &&
                      ` — ${member.dni}`}
                  </SelectItem>
                ),
              )}

          </SelectContent>

        </Select>

      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={
          membersLoading ||
          createMutation.isPending ||
          !form.watch(
            "memberId",
          )
        }
      >

        {createMutation.isPending
          ? "Registrando..."
          : "Registrar entrada"}

      </Button>

    </form>
  );
}