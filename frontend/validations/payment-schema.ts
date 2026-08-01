import {
  z,
} from "zod";


export const paymentSchema =
  z.object({

    membershipId:
      z.string()
        .min(
          1,
          "Seleccioná una membresía",
        ),

    amount:
      z.number()
        .min(
          0,
          "El importe no puede ser negativo",
        ),

    method:
      z.enum([
        "CASH",
        "TRANSFER",
        "CARD",
        "OTHER",
      ]),

    observations:
      z.string()
        .optional(),

    paidAt:
      z.string()
        .min(
          1,
          "Seleccioná una fecha",
        ),

  });


export type PaymentFormValues =
  z.infer<
    typeof paymentSchema
  >;


export type UpdatePaymentValues =
  Pick<
    PaymentFormValues,
    | "amount"
    | "method"
    | "observations"
    | "paidAt"
  >;