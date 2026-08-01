import { z } from "zod";

export const membershipSchema =
  z.object({

    memberId: z
      .string()
      .min(
        1,
        "El socio es obligatorio",
      ),

    planId: z
      .string()
      .min(
        1,
        "El plan es obligatorio",
      ),

    price: z
      .number({
        error: "El precio es obligatorio",
      })
      .positive(
        "El precio debe ser mayor a 0",
      ),

    startDate: z
      .string()
      .min(
        1,
        "La fecha de inicio es obligatoria",
      ),

    endDate: z
      .string()
      .min(
        1,
        "La fecha de finalización es obligatoria",
      ),

    observations: z
      .string()
      .optional(),

  });

export type MembershipFormValues =
  z.infer<
    typeof membershipSchema
  >;