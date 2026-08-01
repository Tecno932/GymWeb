"use client";

import { PageContainer } from "@/components/common/page-container";
import { PageHeader } from "@/components/common/page-header";
import { PageCard } from "@/components/common/page-card";

import {
  CreatePlanDialog,
} from "@/components/plans/create-plan-dialog";

import {
  PlansTable,
} from "@/components/plans/plans-table";

import {
  usePlans,
} from "@/hooks/use-plans";

export default function PlansPage() {

  const {
    data: plans = [],
    isLoading,
    isError,
  } = usePlans();

  return (
    <PageContainer>

      <PageHeader
        title="Planes"
        description="Gestiona los planes disponibles para las membresías."
        action={
          <CreatePlanDialog />
        }
      />


      <PageCard>

        {isLoading && (

          <div className="py-10 text-center text-muted-foreground">
            Cargando planes...
          </div>

        )}


        {isError && (

          <div className="py-10 text-center text-destructive">
            No se pudieron cargar los planes.
          </div>

        )}


        {!isLoading &&
          !isError && (

            <PlansTable
              plans={plans}
            />

          )}

      </PageCard>

    </PageContainer>
  );
}