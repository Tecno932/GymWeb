"use client";

import {
  useState,
} from "react";

import {
  Plus,
  Search,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  PaymentForm,
} from "@/components/payment/payment-form";

import {
  PaymentTable,
} from "@/components/payment/payment-table";

import {
  usePayments,
} from "@/hooks/use-payments";


export default function PaymentsPage() {

  const [
    open,
    setOpen,
  ] = useState(false);


  const [
    page,
    setPage,
  ] = useState(1);


  const [
    search,
    setSearch,
  ] = useState("");


  const {
    data,
    isLoading,
    isError,
    isFetching,
  } = usePayments(
    page,
    search,
  );


  const payments =
    data?.items ?? [];


  const total =
    data?.total ?? 0;


  const pages =
    data?.pages ?? 0;


  function handleSearch(
    value: string,
  ) {

    setSearch(value);

    setPage(1);

  }


  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold tracking-tight">
            Pagos
          </h1>

          <p className="text-muted-foreground">
            Administrá los pagos realizados
            por los socios.
          </p>

        </div>


        <Dialog
          open={open}
          onOpenChange={
            setOpen
          }
        >

          <DialogTrigger
            asChild
          >

            <Button>

              <Plus />

              Registrar pago

            </Button>

          </DialogTrigger>


          <DialogContent>

            <DialogHeader>

              <DialogTitle>
                Registrar pago
              </DialogTitle>

            </DialogHeader>


            <PaymentForm
              onSuccess={() =>
                setOpen(false)
              }
            />

          </DialogContent>

        </Dialog>

      </div>


      {/* BUSCADOR */}

      <div className="flex items-center gap-2">

        <div className="relative flex-1 max-w-md">

          <Search
            className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />

          <Input
            value={search}
            onChange={(event) =>
              handleSearch(
                event.target.value,
              )
            }
            placeholder="Buscar por socio o DNI..."
            className="pl-9"
          />

        </div>

      </div>


      {/* ERROR */}

      {isError && (

        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-6">

          <p className="text-sm text-destructive">
            No se pudieron cargar los pagos.
          </p>

        </div>

      )}


      {/* LOADING */}

      {isLoading && (

        <div className="flex items-center justify-center py-12">

          <p className="text-muted-foreground">
            Cargando pagos...
          </p>

        </div>

      )}


      {/* TABLA */}

      {!isLoading &&
        !isError && (

          <>

            <PaymentTable
              payments={
                payments
              }
            />


            {/* PAGINACIÓN */}

            <div className="flex items-center justify-between">

              <p className="text-sm text-muted-foreground">

                {total === 0
                  ? "No hay pagos"
                  : `${total} pago${total === 1 ? "" : "s"}`}

              </p>


              <div className="flex items-center gap-2">

                <Button
                  variant="outline"
                  size="sm"
                  disabled={
                    page <= 1 ||
                    isFetching
                  }
                  onClick={() =>
                    setPage(
                      (value) =>
                        value - 1,
                    )
                  }
                >
                  Anterior
                </Button>


                <span className="text-sm min-w-20 text-center">

                  Página{" "}
                  {pages === 0
                    ? 0
                    : page}{" "}
                  de{" "}
                  {pages}

                </span>


                <Button
                  variant="outline"
                  size="sm"
                  disabled={
                    page >= pages ||
                    isFetching ||
                    pages === 0
                  }
                  onClick={() =>
                    setPage(
                      (value) =>
                        value + 1,
                    )
                  }
                >
                  Siguiente
                </Button>

              </div>

            </div>

          </>

        )}

    </div>
  );
}