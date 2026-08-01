"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  memberSchema,
  MemberFormValues,
} from "@/validations/member-schema";

import { Member } from "@/types/member";

import { useCreateMember } from "@/hooks/use-create-member";
import { useUpdateMember } from "@/hooks/use-update-member";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


interface Props {
  member?: Member;
  onSuccess?: () => void;
}


export function MemberForm({
  member,
  onSuccess,
}: Props) {


  const createMutation =
    useCreateMember({
      onSuccess,
    });

  const updateMutation =
    useUpdateMember({
      onSuccess,
    });


  const isEditing =
    !!member;



  const form =
    useForm<MemberFormValues>({

      resolver:
        zodResolver(memberSchema),


      defaultValues: {

        firstName:
          member?.firstName ?? "",

        lastName:
          member?.lastName ?? "",

        dni:
          member?.dni ?? "",

        email:
          member?.email ?? "",

        phone:
          member?.phone ?? "",

      },

    });



  function onSubmit(
    values: MemberFormValues,
  ) {


    if (isEditing) {


      updateMutation.mutate({

        id: member!.id,

        data: values,

      });


    } else {


      createMutation.mutate(
        values,
      );


    }


    onSuccess?.();

  }



  const isPending =
    createMutation.isPending ||
    updateMutation.isPending;



  return (

    <form

      onSubmit={
        form.handleSubmit(onSubmit)
      }

      className="space-y-4"

    >


      <Input

        placeholder="Nombre"

        {...form.register(
          "firstName"
        )}

      />



      <Input

        placeholder="Apellido"

        {...form.register(
          "lastName"
        )}

      />



      <Input

        placeholder="DNI"

        {...form.register(
          "dni"
        )}

      />



      <Input

        placeholder="Email"

        {...form.register(
          "email"
        )}

      />



      <Input

        placeholder="Teléfono"

        {...form.register(
          "phone"
        )}

      />



      <Button

        type="submit"

        disabled={isPending}

      >

        {
          isPending

          ? "Guardando..."

          : isEditing

            ? "Guardar cambios"

            : "Crear socio"
        }


      </Button>


    </form>

  );

}