"use client";

import {
  Users,
  UserCheck,
  CreditCard,
  CalendarCheck,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  LogIn,
  LogOut,
} from "lucide-react";

import {
  useDashboard,
} from "@/hooks/use-dashboard";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Button,
} from "@/components/ui/button";



function formatCurrency(
  value: number | string,
) {

  return new Intl.NumberFormat(
    "es-AR",
    {
      style: "currency",
      currency: "ARS",
    },
  ).format(
    Number(value),
  );

}



function formatDate(
  value: string,
) {

  return new Intl.DateTimeFormat(
    "es-AR",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    },
  ).format(
    new Date(value),
  );

}



function formatTime(
  value: string,
) {

  return new Intl.DateTimeFormat(
    "es-AR",
    {
      hour: "2-digit",
      minute: "2-digit",
    },
  ).format(
    new Date(value),
  );

}



export default function DashboardPage() {

  const {
    data,
    isLoading,
    isError,
  } = useDashboard();



  if (isLoading) {

    return (

      <div className="space-y-6">

        <div>

          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="text-muted-foreground">
            Resumen general del gimnasio
          </p>

        </div>


        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

          {[1, 2, 3, 4].map(
            (item) => (

              <Card
                key={item}
              >

                <CardContent className="p-6">

                  <div className="h-20 animate-pulse rounded-md bg-muted" />

                </CardContent>

              </Card>

            ),
          )}

        </div>

      </div>

    );

  }



  if (isError || !data) {

    return (

      <div className="space-y-4">

        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <Card>

          <CardContent className="p-6">

            <p className="text-destructive">
              No se pudieron cargar los datos
              del dashboard.
            </p>

          </CardContent>

        </Card>

      </div>

    );

  }



  return (

    <div className="space-y-6">

      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <div>

        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-muted-foreground">
          Resumen general del gimnasio
        </p>

      </div>



      {/* ========================= */}
      {/* TARJETAS PRINCIPALES */}
      {/* ========================= */}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">


        {/* SOCIOS */}

        <Card>

          <CardHeader className="flex flex-row items-center justify-between pb-2">

            <CardTitle className="text-sm font-medium">
              Socios
            </CardTitle>

            <Users className="h-4 w-4 text-muted-foreground" />

          </CardHeader>


          <CardContent>

            <div className="text-2xl font-bold">
              {data.members.total}
            </div>

            <p className="text-xs text-muted-foreground">

              {data.members.active}
              {" "}activos ·{" "}
              {data.members.inactive}
              {" "}inactivos

            </p>

          </CardContent>

        </Card>



        {/* MEMBRESÍAS */}

        <Card>

          <CardHeader className="flex flex-row items-center justify-between pb-2">

            <CardTitle className="text-sm font-medium">
              Membresías activas
            </CardTitle>

            <UserCheck className="h-4 w-4 text-muted-foreground" />

          </CardHeader>


          <CardContent>

            <div className="text-2xl font-bold">
              {data.memberships.active}
            </div>

            <p className="text-xs text-muted-foreground">

              {data.memberships.expired}
              {" "}vencidas

            </p>

          </CardContent>

        </Card>



        {/* INGRESOS */}

        <Card>

          <CardHeader className="flex flex-row items-center justify-between pb-2">

            <CardTitle className="text-sm font-medium">
              Ingresos del mes
            </CardTitle>

            <CreditCard className="h-4 w-4 text-muted-foreground" />

          </CardHeader>


          <CardContent>

            <div className="text-2xl font-bold">

              {formatCurrency(
                data.payments.month,
              )}

            </div>

            <p className="text-xs text-muted-foreground">

              Hoy:{" "}
              {formatCurrency(
                data.payments.today,
              )}

            </p>

          </CardContent>

        </Card>



        {/* ASISTENCIAS */}

        <Card>

          <CardHeader className="flex flex-row items-center justify-between pb-2">

            <CardTitle className="text-sm font-medium">
              Asistencias hoy
            </CardTitle>

            <CalendarCheck className="h-4 w-4 text-muted-foreground" />

          </CardHeader>


          <CardContent>

            <div className="text-2xl font-bold">
              {data.attendance.today}
            </div>

            <p className="text-xs text-muted-foreground">

              {data.attendance.currentlyInside.length}
              {" "}dentro del gimnasio

            </p>

          </CardContent>

        </Card>


      </div>



      {/* ========================= */}
      {/* ATENCIÓN */}
      {/* ========================= */}

      <div className="grid gap-4 lg:grid-cols-2">


        {/* VENCIDAS */}

        <Card>

          <CardHeader>

            <CardTitle className="flex items-center gap-2">

              <AlertTriangle className="h-5 w-5" />

              Atención requerida

            </CardTitle>

          </CardHeader>


          <CardContent className="space-y-4">


            <div className="flex items-center justify-between rounded-lg border p-4">

              <div>

                <p className="font-medium">
                  Membresías vencidas
                </p>

                <p className="text-sm text-muted-foreground">
                  Requieren renovación
                </p>

              </div>


              <Badge
                variant={
                  data.memberships.expired > 0
                    ? "destructive"
                    : "secondary"
                }
              >

                {data.memberships.expired}

              </Badge>

            </div>



            <div className="flex items-center justify-between rounded-lg border p-4">

              <div>

                <p className="font-medium">
                  Próximos vencimientos
                </p>

                <p className="text-sm text-muted-foreground">
                  Próximos 7 días
                </p>

              </div>


              <Badge
                variant={
                  data.memberships.expiring.length > 0
                    ? "default"
                    : "secondary"
                }
              >

                {data.memberships.expiring.length}

              </Badge>

            </div>


          </CardContent>

        </Card>



        {/* PERSONAS DENTRO */}

        <Card>

          <CardHeader>

            <CardTitle className="flex items-center gap-2">

              <Clock className="h-5 w-5" />

              Dentro del gimnasio

            </CardTitle>

          </CardHeader>


          <CardContent>


            {data.attendance.currentlyInside.length === 0 ? (

              <p className="py-4 text-sm text-muted-foreground">

                No hay socios dentro del gimnasio
                actualmente.

              </p>

            ) : (

              <div className="space-y-3">

                {data.attendance.currentlyInside.map(
                  (attendance) => (

                    <div
                      key={
                        attendance.id
                      }
                      className="flex items-center justify-between rounded-lg border p-3"
                    >

                      <div>

                        <p className="font-medium">

                          {attendance.member.firstName}
                          {" "}
                          {attendance.member.lastName}

                        </p>

                        <p className="text-xs text-muted-foreground">

                          Entrada:
                          {" "}
                          {formatTime(
                            attendance.checkIn,
                          )}

                        </p>

                      </div>


                      <Badge variant="secondary">
                        Dentro
                      </Badge>

                    </div>

                  ),
                )}

              </div>

            )}

          </CardContent>

        </Card>


      </div>



      {/* ========================= */}
      {/* PRÓXIMOS VENCIMIENTOS */}
      {/* ========================= */}

      <Card>

        <CardHeader>

          <CardTitle>
            Próximos vencimientos
          </CardTitle>

        </CardHeader>


        <CardContent>


          {data.memberships.expiring.length === 0 ? (

            <p className="py-4 text-sm text-muted-foreground">

              No hay membresías que venzan
              durante los próximos 7 días.

            </p>

          ) : (

            <div className="space-y-3">

              {data.memberships.expiring.map(
                (membership) => (

                  <div
                    key={
                      membership.id
                    }
                    className="flex items-center justify-between rounded-lg border p-4"
                  >

                    <div>

                      <p className="font-medium">

                        {membership.member.firstName}
                        {" "}
                        {membership.member.lastName}

                      </p>

                      <p className="text-sm text-muted-foreground">

                        {membership.plan.name}

                      </p>

                    </div>


                    <div className="text-right">

                      <p className="font-medium">

                        {formatDate(
                          membership.endDate,
                        )}

                      </p>

                      <p className="text-xs text-muted-foreground">

                        Vencimiento

                      </p>

                    </div>

                  </div>

                ),
              )}

            </div>

          )}

        </CardContent>

      </Card>



      {/* ========================= */}
      {/* PARTE INFERIOR */}
      {/* ========================= */}

      <div className="grid gap-4 lg:grid-cols-3">


        {/* SOCIOS RECIENTES */}

        <Card>

          <CardHeader>

            <CardTitle>
              Socios recientes
            </CardTitle>

          </CardHeader>


          <CardContent>

            <div className="space-y-4">

              {data.recentMembers.map(
                (member) => (

                  <div
                    key={
                      member.id
                    }
                    className="flex items-center justify-between"
                  >

                    <div>

                      <p className="font-medium">

                        {member.firstName}
                        {" "}
                        {member.lastName}

                      </p>

                      <p className="text-xs text-muted-foreground">

                        {formatDate(
                          member.createdAt,
                        )}

                      </p>

                    </div>


                    <Badge
                      variant={
                        member.status === "ACTIVE"
                          ? "default"
                          : "secondary"
                      }
                    >

                      {member.status === "ACTIVE"
                        ? "Activo"
                        : "Inactivo"}

                    </Badge>

                  </div>

                ),
              )}

            </div>

          </CardContent>

        </Card>



        {/* PAGOS RECIENTES */}

        <Card>

          <CardHeader>

            <CardTitle>
              Últimos pagos
            </CardTitle>

          </CardHeader>


          <CardContent>

            <div className="space-y-4">

              {data.recentPayments.map(
                (payment) => (

                  <div
                    key={
                      payment.id
                    }
                    className="flex items-center justify-between"
                  >

                    <div>

                      <p className="font-medium">

                        {payment.membership.member.firstName}
                        {" "}
                        {payment.membership.member.lastName}

                      </p>

                      <p className="text-xs text-muted-foreground">

                        {payment.membership.plan.name}
                        {" · "}
                        {payment.method}

                      </p>

                    </div>


                    <div className="text-right">

                      <p className="font-medium">

                        {formatCurrency(
                          payment.amount,
                        )}

                      </p>

                      <p className="text-xs text-muted-foreground">

                        {formatDate(
                          payment.paidAt,
                        )}

                      </p>

                    </div>

                  </div>

                ),
              )}

            </div>

          </CardContent>

        </Card>



        {/* ASISTENCIAS */}

        <Card>

          <CardHeader>

            <CardTitle>
              Últimas asistencias
            </CardTitle>

          </CardHeader>


          <CardContent>

            <div className="space-y-4">

              {data.recentAttendances.map(
                (attendance) => (

                  <div
                    key={
                      attendance.id
                    }
                    className="flex items-center justify-between"
                  >

                    <div>

                      <p className="font-medium">

                        {attendance.member.firstName}
                        {" "}
                        {attendance.member.lastName}

                      </p>

                      <p className="text-xs text-muted-foreground">

                        {formatDate(
                          attendance.checkIn,
                        )}

                      </p>

                    </div>


                    <div className="text-right">

                      {attendance.checkOut ? (

                        <Badge variant="secondary">

                          <LogOut className="mr-1 h-3 w-3" />

                          Salió

                        </Badge>

                      ) : (

                        <Badge>

                          <LogIn className="mr-1 h-3 w-3" />

                          Dentro

                        </Badge>

                      )}

                    </div>

                  </div>

                ),
              )}

            </div>

          </CardContent>

        </Card>


      </div>

    </div>

  );

}