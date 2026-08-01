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



    return this.prisma.payment.create({

      data: {

        membershipId: dto.membershipId,

        invoiceId: dto.invoiceId,

        amount: dto.amount ?? membership.price,

        method: dto.method,

        observations: dto.observations,

        paidAt: dto.paidAt
          ? new Date(dto.paidAt)
          : undefined,

        dueDate: membership.endDate,

      },

    });

  }





  async update(
    id: string,
    gymId: string,
    dto: UpdatePaymentDto,
  ) {


    await this.findOne(id, gymId);



    return this.prisma.payment.update({

      where: {
        id,
      },


      data: {

        amount: dto.amount,

        method: dto.method,

        observations: dto.observations,

        paidAt: dto.paidAt
          ? new Date(dto.paidAt)
          : undefined,

      },

    });

  }





  async remove(
    id: string,
    gymId: string,
  ) {


    await this.findOne(id, gymId);



    return this.prisma.payment.delete({

      where: {
        id,
      },

    });

  }

}