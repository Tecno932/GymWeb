import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import {
  MemberStatus,
  MembershipStatus,
} from '@prisma/client';


@Injectable()
export class DashboardService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}


  async getDashboard(
    gymId: string,
  ) {

    const now = new Date();


    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );


    const tomorrowStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
    );


    const monthStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      1,
    );


    const next7Days = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 7,
    );


    const [
      totalMembers,
      activeMembers,
      inactiveMembers,

      activeMemberships,
      expiredMemberships,
      expiringMemberships,

      paymentsToday,
      paymentsMonth,
      totalPayments,

      todayAttendances,
      currentAttendances,

      recentMembers,
      recentPayments,
      recentAttendances,

    ] = await Promise.all([


      // =========================
      // SOCIOS
      // =========================

      this.prisma.member.count({
        where: {
          gymId,
        },
      }),


      this.prisma.member.count({
        where: {
          gymId,

          status:
            MemberStatus.ACTIVE,
        },
      }),


      this.prisma.member.count({
        where: {
          gymId,

          status:
            MemberStatus.INACTIVE,
        },
      }),



      // =========================
      // MEMBRESÍAS
      // =========================

      this.prisma.membership.count({
        where: {
          status:
            MembershipStatus.ACTIVE,

          member: {
            gymId,
          },
        },
      }),


      this.prisma.membership.count({
        where: {
          OR: [

            {
              status:
                MembershipStatus.EXPIRED,
            },

            {
              endDate: {
                lt: now,
              },
            },

          ],

          member: {
            gymId,
          },
        },
      }),


      this.prisma.membership.findMany({
        where: {

          endDate: {
            gte: now,
            lte: next7Days,
          },

          member: {
            gymId,
          },

        },

        orderBy: {
          endDate: 'asc',
        },

        take: 10,

        select: {

          id: true,

          startDate: true,

          endDate: true,

          price: true,

          status: true,

          member: {
            select: {

              id: true,

              firstName: true,

              lastName: true,

              dni: true,

            },
          },

          plan: {
            select: {

              id: true,

              name: true,

              durationDays: true,

            },
          },

        },
      }),



      // =========================
      // PAGOS
      // =========================

      this.prisma.payment.aggregate({

        _sum: {
          amount: true,
        },

        where: {

          paidAt: {
            gte: todayStart,
            lt: tomorrowStart,
          },

          membership: {
            member: {
              gymId,
            },
          },

        },

      }),


      this.prisma.payment.aggregate({

        _sum: {
          amount: true,
        },

        where: {

          paidAt: {
            gte: monthStart,
          },

          membership: {
            member: {
              gymId,
            },
          },

        },

      }),


      this.prisma.payment.aggregate({

        _sum: {
          amount: true,
        },

        where: {

          membership: {
            member: {
              gymId,
            },
          },

        },

      }),



      // =========================
      // ASISTENCIAS DE HOY
      // =========================

      this.prisma.attendance.count({

        where: {

          checkIn: {
            gte: todayStart,
            lt: tomorrowStart,
          },

          member: {
            gymId,
          },

        },

      }),



      // =========================
      // PERSONAS DENTRO
      // =========================

      this.prisma.attendance.findMany({

        where: {

          checkOut: null,

          member: {
            gymId,
          },

        },

        orderBy: {
          checkIn: 'desc',
        },

        select: {

          id: true,

          checkIn: true,

          member: {

            select: {

              id: true,

              firstName: true,

              lastName: true,

              dni: true,

            },

          },

        },

      }),



      // =========================
      // SOCIOS RECIENTES
      // =========================

      this.prisma.member.findMany({

        where: {
          gymId,
        },

        orderBy: {
          createdAt: 'desc',
        },

        take: 5,

        select: {

          id: true,

          firstName: true,

          lastName: true,

          createdAt: true,

          status: true,

        },

      }),



      // =========================
      // PAGOS RECIENTES
      // =========================

      this.prisma.payment.findMany({

        where: {

          membership: {

            member: {
              gymId,
            },

          },

        },

        orderBy: {
          paidAt: 'desc',
        },

        take: 5,

        select: {

          id: true,

          amount: true,

          method: true,

          paidAt: true,

          membership: {

            select: {

              member: {

                select: {

                  firstName: true,

                  lastName: true,

                },

              },

              plan: {

                select: {

                  name: true,

                },

              },

            },

          },

        },

      }),



      // =========================
      // ASISTENCIAS RECIENTES
      // =========================

      this.prisma.attendance.findMany({

        where: {

          member: {
            gymId,
          },

        },

        orderBy: {
          checkIn: 'desc',
        },

        take: 5,

        select: {

          id: true,

          checkIn: true,

          checkOut: true,

          member: {

            select: {

              id: true,

              firstName: true,

              lastName: true,

            },

          },

        },

      }),

    ]);



    return {

      members: {

        total:
          totalMembers,

        active:
          activeMembers,

        inactive:
          inactiveMembers,

      },


      memberships: {

        active:
          activeMemberships,

        expired:
          expiredMemberships,

        expiring:
          expiringMemberships,

      },


      payments: {

        today:
          paymentsToday._sum.amount ?? 0,

        month:
          paymentsMonth._sum.amount ?? 0,

        total:
          totalPayments._sum.amount ?? 0,

      },


      attendance: {

        today:
          todayAttendances,

        currentlyInside:
          currentAttendances,

      },


      recentMembers,

      recentPayments,

      recentAttendances,

    };

  }

}