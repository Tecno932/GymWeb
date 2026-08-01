import { z } from "zod";

export const memberSchema = z.object({

  firstName: z
    .string()
    .min(2, "Nombre demasiado corto"),

  lastName: z
    .string()
    .min(2, "Apellido demasiado corto"),

  dni: z
    .string()
    .optional(),

  email: z
    .string()
    .email("Email inválido")
    .optional()
    .or(z.literal("")),

  phone: z
    .string()
    .optional(),

  address: z
    .string()
    .optional(),

  physicalProblems: z
    .string()
    .optional(),

  cardiacProblems: z
    .string()
    .optional(),

  notes: z
    .string()
    .optional(),

});


export type MemberFormValues =
  z.infer<typeof memberSchema>;