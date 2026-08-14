import type { InvoiceStatus } from '@/types/invoice';


interface InvoiceStatusBadgeProps {
  status: InvoiceStatus;
}


const statusConfig: Record<
  InvoiceStatus,
  {
    label: string;
    className: string;
  }
> = {
  PENDING: {
    label: 'Pendiente',
    className:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  },

  PAID: {
    label: 'Pagada',
    className:
      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  },

  OVERDUE: {
    label: 'Vencida',
    className:
      'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  },

  CANCELLED: {
    label: 'Cancelada',
    className:
      'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
  },
};


export function InvoiceStatusBadge({
  status,
}: InvoiceStatusBadgeProps) {

  const config =
    statusConfig[status];

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-2.5
        py-1
        text-xs
        font-medium
        ${config.className}
      `}
    >
      {config.label}
    </span>
  );
}