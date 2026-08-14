import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { AuditAction } from '@prisma/client';
import { AuditLogService } from '../../common/services/audit-log.service';

import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';


@Injectable()
export class PaymentsService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditLogService,
  ) {}


  async findAll(
    gymId: string,
    page = 1,
    limit = 10,
    search = '',
  ) {

    const skip =
      (page - 1) * limit;


    const where = {

      membership: {

        member: {

          gymId,

          ...(search
            ? {
                OR: [
                  {
                    firstName: {
                      contains: search,
                      mode: 'insensitive' as const,
                    },
                  },
                  {
                    lastName: {
                      contains: search,
                      mode: 'insensitive' as const,
                    },
                  },
                  {
                    dni: {
                      contains: search,
                      mode: 'insensitive' as const,
                    },
                  },
                ],
              }
            : {}),

        },

      },

    };


    const [
      items,
      total,
    ] = await Promise.all([

      this.prisma.payment.findMany({

        where,

        include: {

          membership: {

            include: {

              member: true,

              plan: true,

            },

          },

        },

        orderBy: {
          paidAt: 'desc',
        },

        skip,

        take: limit,

      }),


      this.prisma.payment.count({
        where,
      }),

    ]);


    return {

      items,

      total,

      page,

      limit,

      pages:
        Math.ceil(
          total / limit,
        ),

    };

  }



  async findOne(
    id: string,
    gymId: string,
  ) {

    const payment =
      await this.prisma.payment.findFirst({

        where: {

          id,

          membership: {

            member: {

              gymId,

            },

          },

        },


        include: {

          membership: {

            include: {

              member: true,

              plan: true,

            },

          },

        },

      });



    if (!payment) {

      throw new NotFoundException(
        'Pago no encontrado',
      );

    }


    return payment;

  }




  async create(
    user: any,
    dto: CreatePaymentDto,
  ) {
    const membership =
      await this.prisma.membership.findFirst({
        where: {
          id: dto.membershipId,
          member: {
            gymId: user.gymId,
          },
        },
      });

    if (!membership) {
      throw new BadRequestException(
        'La membresía no existe',
      );
    }

    const payment =
      await this.prisma.payment.create({
        data: {
          membershipId: dto.membershipId,

          invoiceId: dto.invoiceId,

          amount:
            dto.amount ??
            membership.price,

          method: dto.method,

          observations:
            dto.observations,

          paidAt: dto.paidAt
            ? new Date(dto.paidAt)
            : undefined,

          dueDate:
            membership.endDate,
        },

        include: {
          membership: {
            include: {
              member: true,
              plan: true,
            },
          },
        },
      });

    await this.audit.create({
      gymId: user.gymId,
      userId: user.id,

      action: AuditAction.CREATE,

      entity: 'Payment',

      entityId: payment.id,

      description:
        `Registró un pago de ${payment.membership.member.firstName} ${payment.membership.member.lastName}`,

      newData: payment,
    });

    return payment;
  }





  async update(
    id: string,
    user: any,
    dto: UpdatePaymentDto,
  ) {
    const payment =
      await this.findOne(
        id,
        user.gymId,
      );

    const updated =
      await this.prisma.payment.update({
        where: {
          id,
        },

        data: {
          amount:
            dto.amount,

          method:
            dto.method,

          observations:
            dto.observations,

          paidAt:
            dto.paidAt
              ? new Date(dto.paidAt)
              : undefined,
        },

        include: {
          membership: {
            include: {
              member: true,
              plan: true,
            },
          },
        },
      });

    await this.audit.create({
      gymId: user.gymId,
      userId: user.id,

      action: AuditAction.UPDATE,

      entity: 'Payment',

      entityId: updated.id,

      description:
        `Actualizó el pago de ${updated.membership.member.firstName} ${updated.membership.member.lastName}`,

      oldData: payment,

      newData: updated,
    });

    return updated;
  }





  async remove(
    id: string,
    user: any,
  ) {
    const payment =
      await this.findOne(
        id,
        user.gymId,
      );

    const deleted =
      await this.prisma.payment.delete({
        where: {
          id,
        },
      });

    await this.audit.create({
      gymId: user.gymId,
      userId: user.id,

      action: AuditAction.DELETE,

      entity: 'Payment',

      entityId: deleted.id,

      description:
        `Eliminó un pago de ${payment.membership.member.firstName} ${payment.membership.member.lastName}`,

      oldData: payment,
    });

    return deleted;
  }

}