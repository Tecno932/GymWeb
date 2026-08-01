"use client";

import {
  useMemberships,
} from "@/hooks/use-memberships";

import {
  MembershipsTable,
} from "@/components/memberships/memberships-table";

import {
  CreateMembershipDialog,
} from "@/components/memberships/create-membership-dialog";

export default function MembershipsPage() {

  const {
    data: memberships = [],
    isLoading,
    isError,
  } = useMemberships();


  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold tracking-tight">
            Membresías
          </h1>

          <p className="text-muted-foreground">
            Gestioná las membresías
            de los socios.
          </p>

        </div>


        <CreateMembershipDialog />

      </div>


      {isLoading && (
        <div className="rounded-lg border p-8 text-center text-muted-foreground">
          Cargando membresías...
        </div>
      )}


      {isError && (
        <div className="rounded-lg border border-destructive/50 p-8 text-center text-destructive">
          No se pudieron cargar
          las membresías.
        </div>
      )}


      {!isLoading &&
        !isError && (

        <MembershipsTable
          memberships={
            memberships
          }
        />

      )}

    </div>
  );
}