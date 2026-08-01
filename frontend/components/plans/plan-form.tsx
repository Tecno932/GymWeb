"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  planSchema,
  PlanFormValues,
} from "@/validations/plan-schema";

import { Plan } from "@/types/plan";

import { useCreatePlan } from "@/hooks/use-create-plan";
import { useUpdatePlan } from "@/hooks/use-update-plan";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

import { Label, } from "@/components/ui/label";

interface Props {
  plan?: Plan;
  onSuccess?: () => void;
}

export function PlanForm({
  plan,
  onSuccess,
}: Props) {

  const isEditing = !!plan;

  const createMutation =
    useCreatePlan({
      onSuccess,
    });

  const updateMutation =
    useUpdatePlan({
      onSuccess,
    });

  const form =
    useForm<PlanFormValues>({
      resolver:
        zodResolver(planSchema),

      defaultValues: {
        name:
          plan?.name ?? "",

        description:
          plan?.description ?? "",

        durationDays:
          plan?.durationDays ?? 30,

        active:
          plan?.active ?? true,
      },

    });

  const isPending =
    createMutation.isPending ||
    updateMutation.isPending;

  function onSubmit(
    values: PlanFormValues,
  ) {

    if (isEditing) {

      updateMutation.mutate({
        id: plan!.id,
        data: values,
      });

      return;
    }

    createMutation.mutate(
      values,
    );
  }

  return (
    <form
      onSubmit={
        form.handleSubmit(onSubmit)
      }
      className="space-y-5"
    >

      <div className="space-y-2">

        <Label htmlFor="name">
          Nombre
        </Label>

        <Input
          id="name"
          placeholder="Ej. Mensual"
          {...form.register("name")}
        />

        {form.formState.errors.name && (
          <p className="text-sm text-destructive">
            {
              form.formState.errors.name
                .message
            }
          </p>
        )}

      </div>


      <div className="space-y-2">

        <Label htmlFor="description">
          Descripción
        </Label>

        <Textarea
          id="description"
          placeholder="Descripción del plan..."
          {...form.register(
            "description",
          )}
        />

      </div>


      <div className="space-y-2">

        <Label htmlFor="durationDays">
          Duración
        </Label>

        <div className="flex items-center gap-3">

          <Input
            id="durationDays"
            type="number"
            min={1}
            {...form.register(
              "durationDays",
              {
                valueAsNumber: true,
              },
            )}
          />

          <span className="text-sm text-muted-foreground">
            días
          </span>

        </div>

        {form.formState.errors.durationDays && (
          <p className="text-sm text-destructive">
            {
              form.formState.errors
                .durationDays
                .message
            }
          </p>
        )}

      </div>


      <div className="flex items-center justify-between rounded-lg border p-4">

        <div className="space-y-1">

          <Label>
            Plan activo
          </Label>

          <p className="text-sm text-muted-foreground">
            Los planes activos pueden asignarse
            a nuevas membresías.
          </p>

        </div>

        <Switch
          checked={
            form.watch("active")
          }
          onCheckedChange={(
            checked,
          ) =>
            form.setValue(
              "active",
              checked,
            )
          }
        />

      </div>


      <Button
        type="submit"
        disabled={isPending}
        className="w-full"
      >

        {isPending
          ? "Guardando..."
          : isEditing
            ? "Guardar cambios"
            : "Crear plan"}

      </Button>

    </form>
  );
}