'use client';

import type { ReactNode } from 'react';


interface InvoiceDialogProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}


export function InvoiceDialog({
  open,
  title,
  children,
  onClose,
}: InvoiceDialogProps) {

  if (!open) {
    return null;
  }


  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(event) => {

        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }

      }}
    >

      <div className="w-full max-w-lg rounded-lg border bg-background shadow-xl">

        <div className="flex items-center justify-between border-b px-5 py-4">

          <h2 className="text-lg font-semibold">
            {title}
          </h2>


          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            ✕
          </button>

        </div>


        <div className="p-5">

          {children}

        </div>

      </div>

    </div>
  );
}