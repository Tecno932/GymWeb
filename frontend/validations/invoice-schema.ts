import { z } from 'zod';

export const invoiceStatusSchema = z.enum([
  'PENDING',
  'PAID',
  'OVERDUE',
  'CANCELLED',
]);

export const createInvoiceSchema = z.object({
  membershipId: z
    .string()
    .min(1, 'La membresía es obligatoria'),

  amount: z
    .number({
      message: 'El importe debe ser un número',
    })
    .positive('El importe debe ser mayor a 0'),

  dueDate: z
    .string()
    .min(1, 'La fecha de vencimiento es obligatoria'),

  status: invoiceStatusSchema.optional(),
});

export const updateInvoiceSchema = z.object({
  amount: z
    .number({
      message: 'El importe debe ser un número',
    })
    .positive('El importe debe ser mayor a 0')
    .optional(),

  dueDate: z
    .string()
    .optional(),

  status: invoiceStatusSchema.optional(),
});

export type InvoiceFormValues = z.infer<
  typeof createInvoiceSchema
>;

export type UpdateInvoiceValues = z.infer<
  typeof updateInvoiceSchema
>;