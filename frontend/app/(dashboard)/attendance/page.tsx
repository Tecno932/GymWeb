"use client";

import {
  useState,
} from "react";

import {
  useAttendances,
} from "@/hooks/use-attendances";

import {
  DataTable,
} from "@/components/common/data-table/data-table";

import {
  attendanceColumns,
} from "@/components/attendance/attendance-columns";

import {
  AttendanceForm,
} from "@/components/attendance/attendance-form";

import {
  Button,
} from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Plus,
  Users,
  UserCheck,
} from "lucide-react";

export default function AttendancePage() {

  const [open, setOpen] =
    useState(false);

  const {
    data: attendances = [],
    isLoading,
  } =
    useAttendances();

  const activeAttendances =
    attendances.filter(
      (attendance) =>
        !attendance.checkOut,
    );

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-3xl font-bold tracking-tight">
            Asistencias
          </h1>

          <p className="text-muted-foreground">
            Controlá los ingresos y
            salidas de los socios.
          </p>

        </div>

        <Dialog
          open={open}
          onOpenChange={setOpen}
        >

          <DialogTrigger asChild>

            <Button>

              <Plus className="mr-2 h-4 w-4" />

              Registrar entrada

            </Button>

          </DialogTrigger>

          <DialogContent>

            <DialogHeader>

              <DialogTitle>
                Registrar entrada
              </DialogTitle>

            </DialogHeader>

            <AttendanceForm
              onSuccess={() =>
                setOpen(false)
              }
            />

          </DialogContent>

        </Dialog>

      </div>


      {/* ESTADÍSTICAS */}

      <div className="grid gap-4 md:grid-cols-2">

        <Card>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

            <CardTitle className="text-sm font-medium">
              Asistencias registradas
            </CardTitle>

            <Users className="h-4 w-4 text-muted-foreground" />

          </CardHeader>

          <CardContent>

            <div className="text-2xl font-bold">
              {attendances.length}
            </div>

            <p className="text-xs text-muted-foreground">
              Registros de asistencia
            </p>

          </CardContent>

        </Card>


        <Card>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

            <CardTitle className="text-sm font-medium">
              Actualmente dentro
            </CardTitle>

            <UserCheck className="h-4 w-4 text-muted-foreground" />

          </CardHeader>

          <CardContent>

            <div className="text-2xl font-bold">
              {activeAttendances.length}
            </div>

            <p className="text-xs text-muted-foreground">
              Socios con entrada activa
            </p>

          </CardContent>

        </Card>

      </div>


      {/* TABLA */}

      <Card>

        <CardHeader>

          <CardTitle>
            Registro de asistencias
          </CardTitle>

        </CardHeader>

        <CardContent>

          {isLoading ? (

            <div className="py-10 text-center text-muted-foreground">
              Cargando asistencias...
            </div>

          ) : (

            <DataTable
              columns={
                attendanceColumns
              }
              data={
                attendances
              }
            />

          )}

        </CardContent>

      </Card>

    </div>
  );
}