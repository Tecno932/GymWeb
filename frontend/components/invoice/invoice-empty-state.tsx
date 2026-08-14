interface InvoiceEmptyStateProps {
  message?: string;
}


export function InvoiceEmptyState({
  message = 'No hay facturas registradas.',
}: InvoiceEmptyStateProps) {

  return (
    <div className="flex min-h-60 items-center justify-center rounded-lg border border-dashed">
      <div className="text-center">

        <p className="text-sm text-muted-foreground">
          {message}
        </p>

      </div>
    </div>
  );
}