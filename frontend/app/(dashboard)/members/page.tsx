"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { MembersTable } from "@/components/members/members-table";
import { SearchInput } from "@/components/common/search-input";
import { useMembers } from "@/hooks/use-members";
import { Button } from "@/components/ui/button";
import { CreateMemberDialog } from "@/components/members/create-member-dialog";

export default function MembersPage() {

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");


  const {
    data,
    isLoading,
  } = useMembers(
    page,
    search,
  );


  return (

    <PageContainer
      title="Socios"
      description="Gestión de socios del gimnasio"
    >

      <div className="flex items-center justify-between">

        <SearchInput
          value={search}
          onChange={(value)=>{

            setPage(1);

            setSearch(value);

          }}
          placeholder="Buscar por nombre o DNI"
        />


        <CreateMemberDialog />

      </div>


      {isLoading ? (

        <p>
          Cargando...
        </p>

      ) : (

        <MembersTable
          members={
            data?.items ?? []
          }
        />

      )}

    </PageContainer>

  );
}