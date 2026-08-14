'use client';

import { useState } from 'react';

import { useInvoices } from '@/hooks/use-invoices';

import type { Invoice } from '@/types/invoice';

import { InvoiceTable } from '@/components/invoice/invoice-table';
import { InvoiceEmptyState } from '@/components/invoice/invoice-empty-state';
import { InvoiceForm } from '@/components/invoice/invoice-form';
import { InvoiceDialog } from '@/components/invoice/invoice-dialog';

import type {
  InvoiceFormValues,
} from '@/validations/invoice-schema';


export default function InvoicesPage() {

  const {
    data: invoices = [],
    isLoading,
    isError,
    error,
  } = useInvoices();


  const [
    selectedInvoice,
    setSelectedInvoice,
  ] = useState<Invoice | null>(null);


  const [
    isCreateOpen,
    setIsCreateOpen,
  ] = useState(false);


  if (isLoading) {

    return (
      <div className="p-6">

        <h1 className="mb-6 text-2xl font-semibold">
          Facturas
        </h1>

        <div className="flex min-h-60 items-center justify-center rounded-lg border">

          <p className="text-sm text-muted-foreground">
            Cargando facturas...
          </p>

        </div>

      </div>
    );

  }


  if (isError) {

    return (
      <div className="p-6">

        <h1 className="mb-6 text-2xl font-semibold">
          Facturas
        </h1>

        <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/30">

          <p className="font-medium text-red-700 dark:text-red-400">
            No se pudieron cargar las facturas.
          </p>

          {error instanceof Error && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {error.message}
            </p>
          )}

        </div>

      </div>
    );

  }


  return (
    <div className="p-6">

      {/* HEADER */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-semibold">
            Facturas
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Gestioná las facturas de las membresías.
          </p>

        </div>


        <button
          type="button"
          onClick={() =>
            setIsCreateOpen(true)
          }
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Nueva factura
        </button>

      </div>


      {/* LISTA */}

      {invoices.length === 0 ? (

        <InvoiceEmptyState />

      ) : (

        <InvoiceTable
          invoices={invoices}

          onView={(invoice) => {
            setSelectedInvoice(invoice);
          }}

          onEdit={(invoice) => {
            console.log(
              'Editar factura:',
              invoice.id,
            );
          }}

          onDelete={(invoice) => {
            console.log(
              'Eliminar factura:',
              invoice.id,
            );
          }}
        />

      )}


      {/* DETALLE */}

      {selectedInvoice && (

        <div className="mt-6 rounded-lg border p-4">

          <div className="flex items-center justify-between">

            <h2 className="font-semibold">
              Detalle de factura
            </h2>

            <button
              type="button"
              onClick={() =>
                setSelectedInvoice(null)
              }
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Cerrar
            </button>

          </div>


          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* SOCIO */}

            <div>

              <p className="text-xs text-muted-foreground">
                Socio
              </p>

              <p className="font-medium">

                {
                  selectedInvoice
                    .membership
                    .member
                    .firstName
                }{' '}

                {
                  selectedInvoice
                    .membership
                    .member
                    .lastName
                }

              </p>

            </div>


            {/* PLAN */}

            <div>

              <p className="text-xs text-muted-foreground">
                Plan
              </p>

              <p className="font-medium">

                {
                  selectedInvoice
                    .membership
                    .plan
                    .name
                }

              </p>

            </div>


            {/* IMPORTE */}

            <div>

              <p className="text-xs text-muted-foreground">
                Importe
              </p>

              <p className="font-medium">

                $
                {Number(
                  selectedInvoice.amount,
                ).toLocaleString(
                  'es-AR',
                )}

              </p>

            </div>


            {/* PAGOS */}

            <div>

              <p className="text-xs text-muted-foreground">
                Pagos
              </p>

              <p className="font-medium">
                {
                  selectedInvoice
                    .payments
                    .length
                }
              </p>

            </div>

          </div>

        </div>

      )}


      {/* NUEVA FACTURA */}

      <InvoiceDialog
        open={isCreateOpen}
        title="Nueva factura"
        onClose={() =>
          setIsCreateOpen(false)
        }
      >

        <InvoiceForm

          onCancel={() =>
            setIsCreateOpen(false)
          }

          onSubmit={async (
            data: InvoiceFormValues,
          ) => {

            console.log(
              'Datos de factura:',
              data,
            );

            /*
             * Próximo paso:
             *
             * POST /invoices
             *
             * Por ahora solamente
             * comprobamos que el
             * formulario funciona.
             */

          }}

        />

      </InvoiceDialog>

    </div>
  );
}