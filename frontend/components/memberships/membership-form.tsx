"use client";

import { useEffect } from "react";

import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import {
  membershipSchema,
  MembershipFormValues,
} from "@/validations/membership-schema";

import {
  Membership,
} from "@/types/membership";

import {
  useMembers,
} from "@/hooks/use-members";

import {
  usePlans,
} from "@/hooks/use-plans";

import {
  useCreateMembership,
} from "@/hooks/use-create-membership";

import {
  useUpdateMembership,
} from "@/hooks/use-update-membership";

import {
  Input,
} from "@/components/ui/input";

import {
  Button,
} from "@/components/ui/button";

import {
  Textarea,
} from "@/components/ui/textarea";

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

interface Props {
  membership?: Membership;
  onSuccess?: () => void;
}

export function MembershipForm({
  membership,
  onSuccess,
}: Props) {

  const isEditing =
    !!membership;


  const {
    data: membersResponse,
    isLoading: membersLoading,
  } = useMembers(1, "");


  const members =
    membersResponse?.items ?? [];

console.log(membersResponse);
console.log(members);

  const {
    data: plans = [],
    isLoading: plansLoading,
  } = usePlans();


  const createMutation =
    useCreateMembership({
      onSuccess,
    });


  const updateMutation =
    useUpdateMembership({
      onSuccess,
    });


  const form =
    useForm<MembershipFormValues>({
      resolver:
        zodResolver(
          membershipSchema,
        ),

      defaultValues: {

        memberId:
          membership?.memberId ??
          "",

        planId:
          membership?.planId ??
          "",

        price:
          membership
            ? Number(
                membership.price,
              )
            : 0,

        startDate:
          membership?.startDate
            ? membership.startDate.slice(
                0,
                10,
              )
            : new Date()
                .toISOString()
                .slice(
                  0,
                  10,
                ),

        endDate:
          membership?.endDate
            ? membership.endDate.slice(
                0,
                10,
              )
            : "",

        observations:
          membership?.observations ??
          "",

      },

    });


  const selectedPlanId =
    form.watch(
      "planId",
    );


  const startDate =
    form.watch(
      "startDate",
    );


  /*
   * Calculamos automáticamente
   * la fecha de finalización.
   */
  useEffect(() => {

    if (
      !selectedPlanId ||
      !startDate
    ) {
      return;
    }


    /*
     * Si estamos editando,
     * no modificamos automáticamente
     * una fecha que ya existe.
     */
    if (
      isEditing &&
      membership?.endDate
    ) {
      return;
    }


    const selectedPlan =
      plans.find(
        (plan) =>
          plan.id ===
          selectedPlanId,
      );


    if (!selectedPlan) {
      return;
    }


    const date =
      new Date(
        `${startDate}T00:00:00`,
      );


    date.setDate(
      date.getDate() +
        selectedPlan.durationDays,
    );


    const endDate =
      date
        .toISOString()
        .slice(
          0,
          10,
        );


    form.setValue(
      "endDate",
      endDate,
    );

  }, [
    selectedPlanId,
    startDate,
    plans,
    form,
    isEditing,
    membership,
  ]);


  function onSubmit(
    values: MembershipFormValues,
  ) {

    if (isEditing) {

      updateMutation.mutate({
        id:
          membership!.id,

        data:
          values,
      });

      return;
    }


    createMutation.mutate(
      values,
    );

  }


  const isPending =
    createMutation.isPending ||
    updateMutation.isPending;


  const loading =
    membersLoading ||
    plansLoading;


  return (

    <form
      onSubmit={
        form.handleSubmit(
          onSubmit,
        )
      }
      className="space-y-5"
    >

      {/* SOCIO */}

      <div className="space-y-2">

        <Label>
          Socio
        </Label>

        <Select
          value={
            form.watch(
              "memberId",
            )
          }
          onValueChange={(
            value,
          ) =>
            form.setValue(
              "memberId",
              value,
            )
          }
        >

          <SelectTrigger>

            <SelectValue
              placeholder={
                loading
                  ? "Cargando..."
                  : "Seleccionar socio"
              }
            />

          </SelectTrigger>


          <SelectContent>

            {members.map(
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


        {form.formState.errors
          .memberId && (

          <p className="text-sm text-destructive">

            {
              form.formState.errors
                .memberId.message
            }

          </p>

        )}

      </div>


      {/* PLAN */}

      <div className="space-y-2">

        <Label>
          Plan
        </Label>

        <Select
          value={
            form.watch(
              "planId",
            )
          }
          onValueChange={(
            value,
          ) => {

            form.setValue(
              "planId",
              value,
            );


            const plan =
              plans.find(
                (item) =>
                  item.id ===
                  value,
              );


            if (plan) {

              const start =
                form.getValues(
                  "startDate",
                );


              if (start) {

                const date =
                  new Date(
                    `${start}T00:00:00`,
                  );


                date.setDate(
                  date.getDate() +
                    plan.durationDays,
                );


                form.setValue(
                  "endDate",
                  date
                    .toISOString()
                    .slice(
                      0,
                      10,
                    ),
                );

              }

            }

          }}
        >

          <SelectTrigger>

            <SelectValue
              placeholder="Seleccionar plan"
            />

          </SelectTrigger>


          <SelectContent>

            {plans
              .filter(
                (plan) =>
                  plan.active ||
                  plan.id ===
                    membership?.planId,
              )
              .map(
                (plan) => (

                  <SelectItem
                    key={
                      plan.id
                    }
                    value={
                      plan.id
                    }
                  >

                    {plan.name}{" "}
                    —{" "}
                    {plan.durationDays} días

                  </SelectItem>

                ),
              )}

          </SelectContent>

        </Select>


        {form.formState.errors
          .planId && (

          <p className="text-sm text-destructive">

            {
              form.formState.errors
                .planId.message
            }

          </p>

        )}

      </div>


      {/* PRECIO */}

      <div className="space-y-2">

        <Label>
          Precio
        </Label>

        <Input
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          {...form.register(
            "price",
            {
              valueAsNumber:
                true,
            },
          )}
        />


        {form.formState.errors
          .price && (

          <p className="text-sm text-destructive">

            {
              form.formState.errors
                .price.message
            }

          </p>

        )}

      </div>


      {/* FECHA INICIO */}

      <div className="space-y-2">

        <Label>
          Fecha de inicio
        </Label>

        <Input
          type="date"
          {...form.register(
            "startDate",
          )}
        />


        {form.formState.errors
          .startDate && (

          <p className="text-sm text-destructive">

            {
              form.formState.errors
                .startDate.message
            }

          </p>

        )}

      </div>


      {/* FECHA FIN */}

      <div className="space-y-2">

        <Label>
          Fecha de finalización
        </Label>

        <Input
          type="date"
          {...form.register(
            "endDate",
          )}
        />


        {form.formState.errors
          .endDate && (

          <p className="text-sm text-destructive">

            {
              form.formState.errors
                .endDate.message
            }

          </p>

        )}

      </div>


      {/* OBSERVACIONES */}

      <div className="space-y-2">

        <Label>
          Observaciones
        </Label>

        <Textarea
          placeholder="Observaciones..."
          {...form.register(
            "observations",
          )}
        />

      </div>


      {/* BOTÓN */}

      <Button
        type="submit"
        disabled={
          isPending ||
          loading
        }
        className="w-full"
      >

        {isPending
          ? "Guardando..."
          : isEditing
            ? "Guardar cambios"
            : "Crear membresía"}

      </Button>

    </form>

  );
}