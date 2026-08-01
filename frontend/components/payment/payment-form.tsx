"use client";

import { useEffect } from "react";

import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import {
  paymentSchema,
  PaymentFormValues,
} from "@/validations/payment-schema";

import {
  Payment,
} from "@/types/payment";

import {
  useMemberships,
} from "@/hooks/use-memberships";

import {
  useCreatePayment,
} from "@/hooks/use-create-payment";

import {
  useUpdatePayment,
} from "@/hooks/use-update-payment";

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
  payment?: Payment;
  onSuccess?: () => void;
}


export function PaymentForm({
  payment,
  onSuccess,
}: Props) {

  const isEditing =
    !!payment;


  const {
    data: memberships = [],
    isLoading: membershipsLoading,
  } = useMemberships();


  const createMutation =
    useCreatePayment({
      onSuccess,
    });


  const updateMutation =
    useUpdatePayment({
      onSuccess,
    });


  const form =
    useForm<PaymentFormValues>({
      resolver:
        zodResolver(
          paymentSchema,
        ),

      defaultValues: {

        membershipId:
          payment?.membershipId ??
          "",

        amount:
          payment
            ? Number(
                payment.amount,
              )
            : 0,

        method:
          payment?.method ??
          "CASH",

        observations:
          payment?.observations ??
          "",

        paidAt:
          payment?.paidAt
            ? payment.paidAt.slice(
                0,
                10,
              )
            : new Date()
                .toISOString()
                .slice(
                  0,
                  10,
                ),

      },
    });


  const selectedMembershipId =
    form.watch(
      "membershipId",
    );


  /*
   * Cuando seleccionamos una membresía
   * completamos automáticamente su precio.
   */
  useEffect(() => {

    if (
      !selectedMembershipId
    ) {
      return;
    }


    const membership =
      memberships.find(
        (item) =>
          item.id ===
          selectedMembershipId,
      );


    if (!membership) {
      return;
    }


    /*
     * Si estamos editando,
     * conservamos el importe existente.
     */
    if (isEditing) {
      return;
    }


    form.setValue(
      "amount",
      Number(
        membership.price,
      ),
    );

  }, [
    selectedMembershipId,
    memberships,
    form,
    isEditing,
  ]);


  function onSubmit(
    values: PaymentFormValues,
  ) {

    if (isEditing) {

      const updateData = {
        amount: values.amount,
        method: values.method,
        observations:
          values.observations,
        paidAt: values.paidAt,
      };

      updateMutation.mutate({

        id:
          payment!.id,

        data:
          updateData,

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


  return (

    <form
      onSubmit={
        form.handleSubmit(
          onSubmit,
        )
      }
      className="space-y-5"
    >

      {/* MEMBRESÍA */}

      <div className="space-y-2">

        <Label>
          Membresía
        </Label>


        <Select
          value={
            form.watch(
              "membershipId",
            )
          }
          disabled={isEditing}
          onValueChange={(
            value,
          ) =>
            form.setValue(
              "membershipId",
              value,
              {
                shouldValidate:
                  true,
              },
            )
          }
        >

          <SelectTrigger>

            <SelectValue
              placeholder={
                membershipsLoading
                  ? "Cargando..."
                  : "Seleccionar membresía"
              }
            />

          </SelectTrigger>


          <SelectContent>

            {memberships
              .filter(
                (membership) =>
                  membership.status === "ACTIVE" ||
                  membership.id ===
                    payment?.membershipId,
              )
              .map(
                (membership) => (

                <SelectItem
                  key={
                    membership.id
                  }

                  value={
                    membership.id
                  }
                >

                {membership.member
                  ? `${membership.member.firstName} ${membership.member.lastName}`
                  : "Socio desconocido"}

                {" — "}

                {membership.plan?.name ??
                  "Plan desconocido"}

                </SelectItem>

              ),
            )}

          </SelectContent>

        </Select>


        {form.formState.errors
          .membershipId && (

          <p className="text-sm text-destructive">

            {
              form.formState.errors
                .membershipId.message
            }

          </p>

        )}

      </div>


      {/* PRECIO */}

      <div className="space-y-2">

        <Label>
          Importe
        </Label>


        <Input
          type="number"
          min="0"
          step="0.01"

          placeholder="0.00"

          {...form.register(
            "amount",
            {
              valueAsNumber:
                true,
            },
          )}
        />


        <p className="text-xs text-muted-foreground">
          El importe se completa automáticamente
          según la membresía, pero puede modificarse.
        </p>


        {form.formState.errors
          .amount && (

          <p className="text-sm text-destructive">

            {
              form.formState.errors
                .amount.message
            }

          </p>

        )}

      </div>


      {/* MÉTODO */}

      <div className="space-y-2">

        <Label>
          Método de pago
        </Label>


        <Select
          value={
            form.watch(
              "method",
            )
          }

          onValueChange={(
            value,
          ) =>
            form.setValue(
              "method",
              value as PaymentFormValues["method"],
              {
                shouldValidate:
                  true,
              },
            )
          }
        >

          <SelectTrigger>

            <SelectValue />

          </SelectTrigger>


          <SelectContent>

            <SelectItem value="CASH">
              Efectivo
            </SelectItem>

            <SelectItem value="TRANSFER">
              Transferencia
            </SelectItem>

            <SelectItem value="CARD">
              Tarjeta
            </SelectItem>

            <SelectItem value="OTHER">
              Otro
            </SelectItem>

          </SelectContent>

        </Select>


        {form.formState.errors
          .method && (

          <p className="text-sm text-destructive">

            {
              form.formState.errors
                .method.message
            }

          </p>

        )}

      </div>


      {/* FECHA */}

      <div className="space-y-2">

        <Label>
          Fecha de pago
        </Label>


        <Input
          type="date"

          {...form.register(
            "paidAt",
          )}
        />


        {form.formState.errors
          .paidAt && (

          <p className="text-sm text-destructive">

            {
              form.formState.errors
                .paidAt.message
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
          membershipsLoading
        }

        className="w-full"
      >

        {isPending
          ? "Guardando..."
          : isEditing
            ? "Guardar cambios"
            : "Registrar pago"}

      </Button>

    </form>

  );
}