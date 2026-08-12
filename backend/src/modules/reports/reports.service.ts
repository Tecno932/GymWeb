import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ReportsService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getRevenue(
    gymId: string,
    from?: string,
    to?: string,
  ) {

    const where = {

      membership: {

        member: {

          gymId,

        },

      },

      ...(from || to
        ? {
            paidAt: {

              ...(from
                ? {
                    gte: new Date(from),
                  }
                : {}),

              ...(to
                ? {
                    lte: new Date(to),
                  }
                : {}),

            },
          }
        : {}),

    };


    const payments =
      await this.prisma.payment.findMany({

        where,

        include: {

          membership: {

            include: {

              member: {

                select: {

                  id: true,

                  firstName: true,

                  lastName: true,

                },

              },

              plan: {

                select: {

                  id: true,

                  name: true,

                },

              },

            },

          },

        },

        orderBy: {

          paidAt: "desc",

        },

      });


    const total =
      payments.reduce(

        (sum, payment) =>
          sum + Number(payment.amount),

        0,

      );


    const byMethod =
      payments.reduce(

        (acc, payment) => {

          const method =
            payment.method;

          acc[method] =
            (acc[method] ?? 0) +
            Number(payment.amount);

          return acc;

        },

        {} as Record<string, number>,

      );


    return {

      total,

      count:
        payments.length,

      byMethod,

      payments,

    };

  }

  async getMembers(
    gymId: string,
  ) {

    return {
      message: 'Pendiente de implementar',
      gymId,
    };

  }

  async getAttendance(
    gymId: string,
  ) {

    return {
      message: 'Pendiente de implementar',
      gymId,
    };

  }

  async getExpiringMemberships(
    gymId: string,
  ) {

    return {
      message: 'Pendiente de implementar',
      gymId,
    };

  }

  async getDebtors(
    gymId: string,
  ) {

    return {
      message: 'Pendiente de implementar',
      gymId,
    };

  }

}