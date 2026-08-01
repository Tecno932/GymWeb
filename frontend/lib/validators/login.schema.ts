import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .email("Correo inválido")
    .min(1, "Ingrese un correo"),

  password: z
    .string()
    .min(6, "Mínimo 6 caracteres"),
});

export type LoginSchema = z.infer<
  typeof loginSchema
>;