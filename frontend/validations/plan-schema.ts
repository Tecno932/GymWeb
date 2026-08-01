import { z } from "zod";

export const planSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(
      100,
      "El nombre no puede superar los 100 caracteres",
    ),

  description: z
    .string()
    .optional(),

  durationDays: z
    .number({
      error: "La duración debe ser un número",
    })
    .int("La duración debe ser un número entero")
    .min(
      1,
      "La duración debe ser de al menos 1 día",
    ),

  active: z.boolean(),
});

export type PlanFormValues =
  z.infer<typeof planSchema>;