import type { Invoice } from '@/types/invoice';

import { InvoiceStatusBadge } from './invoice-status-badge';


interface InvoiceTableProps {
  invoices: Invoice[];
  onView?: (invoice: Invoice) => void;
  onEdit?: (invoice: Invoice) => void;
  onDelete?: (invoice: Invoice) => void;
}


function formatCurrency(
  value: number | string,
) {

  return new Intl.NumberFormat(
    'es-AR',
    {
      style: 'currency',
      currency: 'ARS',
    },
  ).format(
    Number(value),
  );

}


function formatDate(
  value: string,
) {

  return new Intl.DateTimeFormat(
    'es-AR',
    {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    },
  ).format(
    new Date(value),
  );

}


export function InvoiceTable({
  invoices,
  onView,
  onEdit,
  onDelete,
}: InvoiceTableProps) {

  return (
    <div className="overflow-x-auto rounded-lg border">

      <table className="w-full text-sm">

        <thead className="border-b bg-muted/50">

          <tr>

            <th className="px-4 py-3 text-left font-medium">
              Socio
            </th>

            <th className="px-4 py-3 text-left font-medium">
              Plan
            </th>

            <th className="px-4 py-3 text-left font-medium">
              Importe
            </th>

            <th className="px-4 py-3 text-left font-medium">
              Vencimiento
            </th>

            <th className="px-4 py-3 text-left font-medium">
              Estado
            </th>

            <th className="px-4 py-3 text-left font-medium">
              Pagos
            </th>

            <th className="px-4 py-3 text-right font-medium">
              Acciones
            </th>

          </tr>

        </thead>


        <tbody>

          {invoices.map(
            (invoice) => (

              <tr
                key={invoice.id}
                className="border-b last:border-0 hover:bg-muted/30"
              >

                <td className="px-4 py-3">

                  <div>

                    <p className="font-medium">
                      {invoice.membership.member.firstName}{' '}
                      {invoice.membership.member.lastName}
                    </p>

                    {invoice.membership.member.dni && (
                      <p className="text-xs text-muted-foreground">
                        DNI:{' '}
                        {invoice.membership.member.dni}
                      </p>
                    )}

                  </div>

                </td>


                <td className="px-4 py-3">

                  {invoice.membership.plan.name}

                </td>


                <td className="px-4 py-3 font-medium">

                  {formatCurrency(
                    invoice.amount,
                  )}

                </td>


                <td className="px-4 py-3">

                  {formatDate(
                    invoice.dueDate,
                  )}

                </td>


                <td className="px-4 py-3">

                  <InvoiceStatusBadge
                    status={invoice.status}
                  />

                </td>


                <td className="px-4 py-3">

                  {invoice.payments.length}

                </td>


                <td className="px-4 py-3">

                  <div className="flex justify-end gap-2">

                    {onView && (
                      <button
                        type="button"
                        onClick={() =>
                          onView(invoice)
                        }
                        className="rounded-md border px-3 py-1.5 text-xs hover:bg-muted"
                      >
                        Ver
                      </button>
                    )}


                    {onEdit && (
                      <button
                        type="button"
                        onClick={() =>
                          onEdit(invoice)
                        }
                        className="rounded-md border px-3 py-1.5 text-xs hover:bg-muted"
                      >
                        Editar
                      </button>
                    )}


                    {onDelete && (
                      <button
                        type="button"
                        onClick={() =>
                          onDelete(invoice)
                        }
                        className="rounded-md border px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                      >
                        Eliminar
                      </button>
                    )}

                  </div>

                </td>

              </tr>

            ),
          )}

        </tbody>

      </table>

    </div>
  );
}