'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  createInvoiceSchema,
  type InvoiceFormValues,
} from '@/validations/invoice-schema';

import type {
  Invoice,
  InvoiceStatus,
} from '@/types/invoice';


interface InvoiceFormProps {
  invoice?: Invoice | null;
  onSubmit: (
    data: InvoiceFormValues,
  ) => void | Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}


const statuses: {
  value: InvoiceStatus;
  label: string;
}[] = [
  {
    value: 'PENDING',
    label: 'Pendiente',
  },
  {
    value: 'PAID',
    label: 'Pagada',
  },
  {
    value: 'OVERDUE',
    label: 'Vencida',
  },
  {
    value: 'CANCELLED',
    label: 'Cancelada',
  },
];


export function InvoiceForm({
  invoice,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: InvoiceFormProps) {

  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(
      createInvoiceSchema,
    ),

    defaultValues: {
      membershipId:
        invoice?.membershipId ?? '',

      amount: invoice
        ? Number(invoice.amount)
        : 0,

      dueDate: invoice
        ? invoice.dueDate.slice(0, 10)
        : '',

      status:
        invoice?.status ?? 'PENDING',
    },
  });


  useEffect(() => {

    if (!invoice) {
      form.reset({
        membershipId: '',
        amount: 0,
        dueDate: '',
        status: 'PENDING',
      });

      return;
    }


    form.reset({
      membershipId:
        invoice.membershipId,

      amount:
        Number(invoice.amount),

      dueDate:
        invoice.dueDate.slice(0, 10),

      status:
        invoice.status,
    });

  }, [invoice, form]);


  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5"
    >

      <div>

        <label className="mb-2 block text-sm font-medium">
          ID de membresía
        </label>

        <input
          {...form.register('membershipId')}
          placeholder="ID de la membresía"
          className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
        />

        {form.formState.errors.membershipId && (
          <p className="mt-1 text-xs text-red-500">
            {
              form.formState.errors
                .membershipId.message
            }
          </p>
        )}

      </div>


      <div>

        <label className="mb-2 block text-sm font-medium">
          Importe
        </label>

        <input
          type="number"
          step="0.01"
          {...form.register('amount', {
            valueAsNumber: true,
          })}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
        />

        {form.formState.errors.amount && (
          <p className="mt-1 text-xs text-red-500">
            {
              form.formState.errors
                .amount.message
            }
          </p>
        )}

      </div>


      <div>

        <label className="mb-2 block text-sm font-medium">
          Fecha de vencimiento
        </label>

        <input
          type="date"
          {...form.register('dueDate')}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
        />

        {form.formState.errors.dueDate && (
          <p className="mt-1 text-xs text-red-500">
            {
              form.formState.errors
                .dueDate.message
            }
          </p>
        )}

      </div>


      <div>

        <label className="mb-2 block text-sm font-medium">
          Estado
        </label>

        <select
          {...form.register('status')}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
        >

          {statuses.map((status) => (
            <option
              key={status.value}
              value={status.value}
            >
              {status.label}
            </option>
          ))}

        </select>

      </div>


      <div className="flex justify-end gap-2 border-t pt-4">

        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="rounded-md border px-4 py-2 text-sm hover:bg-muted disabled:opacity-50"
        >
          Cancelar
        </button>


        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {isSubmitting
            ? 'Guardando...'
            : invoice
              ? 'Guardar cambios'
              : 'Crear factura'}
        </button>

      </div>

    </form>
  );
}