import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  AuditAction,
  MembershipStatus,
} from '@prisma/client';

import { AuditLogService } from '../../common/services/audit-log.service';
import { MembershipStatusService } from './membership-status.service';
import { PrismaService } from '../../prisma/prisma.service';

import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';


@Injectable()
export class MembershipsService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditLogService,
    private readonly membershipStatus: MembershipStatusService,
  ) {}



  async findAll(
    gymId: string,
  ) {

    await this.membershipStatus.synchronize(
      gymId,
    );


    return this.prisma.membership.findMany({

      where: {
        member: {
          gymId,
        },
      },

      include: {
        member: true,
        plan: true,
      },

      orderBy: {
        createdAt: 'desc',
      },

    });

  }



  async findOne(
    id: string,
    gymId: string,
  ) {

    await this.membershipStatus.synchronize(
      gymId,
    );


    const membership =
      await this.prisma.membership.findFirst({

        where: {
          id,

          member: {
            gymId,
          },
        },

        include: {
          member: true,
          plan: true,
          invoices: true,
          payments: true,
        },

      });


    if (!membership) {

      throw new NotFoundException(
        'Membresía no encontrada',
      );

    }


    return membership;

  }



  async create(
    user: any,
    dto: CreateMembershipDto,
  ) {

    const member =
      await this.prisma.member.findFirst({

        where: {
          id: dto.memberId,

          gymId: user.gymId,
        },

      });


    if (!member) {

      throw new NotFoundException(
        'Socio no encontrado',
      );

    }



    const plan =
      await this.prisma.plan.findFirst({

        where: {
          id: dto.planId,

          gymId: user.gymId,

          active: true,
        },

      });


    if (!plan) {

      throw new NotFoundException(
        'Plan no encontrado',
      );

    }



    const active =
      await this.prisma.membership.findFirst({

        where: {
          memberId: dto.memberId,

          status: MembershipStatus.ACTIVE,
        },

      });


    if (active) {

      throw new BadRequestException(
        'El socio ya posee una membresía activa.',
      );

    }



    const membership =
      await this.prisma.membership.create({

        data: {

          memberId: dto.memberId,

          planId: dto.planId,

          price: dto.price,

          startDate:
            new Date(dto.startDate),

          endDate:
            new Date(dto.endDate),

          observations:
            dto.observations,

        },

        include: {
          member: true,
          plan: true,
        },

      });



    await this.audit.create({

      gymId: user.gymId,

      userId: user.id,

      action: AuditAction.CREATE,

      entity: 'Membership',

      entityId: membership.id,

      description:
        `Creó una membresía para ${membership.member.firstName} ${membership.member.lastName}`,

      newData: membership,

    });


    return membership;

  }



  async update(
    id: string,
    gymId: string,
    dto: UpdateMembershipDto,
  ) {

    const membership =
      await this.prisma.membership.findFirst({

        where: {

          id,

          member: {
            gymId,
          },

        },

        include: {
          member: true,
          plan: true,
        },

      });


    if (!membership) {

      throw new NotFoundException(
        'Membresía no encontrada',
      );

    }



    await this.membershipStatus.synchronize(
      gymId,
    );



    const updated =
      await this.prisma.membership.update({

        where: {
          id,
        },

        data: {

          price:
            dto.price !== undefined
              ? dto.price
              : undefined,

          observations:
            dto.observations !== undefined
              ? dto.observations
              : undefined,

          startDate:
            dto.startDate
              ? new Date(dto.startDate)
              : undefined,

          endDate:
            dto.endDate
              ? new Date(dto.endDate)
              : undefined,

        },

        include: {
          member: true,
          plan: true,
        },

      });



    await this.audit.create({

      gymId,

      // Por ahora update no recibe user.
      // Lo corregiremos al revisar autorización/roles.

      userId: undefined,

      action: AuditAction.UPDATE,

      entity: 'Membership',

      entityId: id,

      description:
        `Actualizó la membresía de ${membership.member.firstName} ${membership.member.lastName}`,

      oldData: membership,

      newData: updated,

    });


    return updated;

  }



  async remove(
    id: string,
    gymId: string,
  ) {

    const membership =
      await this.prisma.membership.findFirst({

        where: {

          id,

          member: {
            gymId,
          },

        },

        include: {
          member: true,
          plan: true,
        },

      });


    if (!membership) {

      throw new NotFoundException(
        'Membresía no encontrada',
      );

    }



    const updated =
      await this.prisma.membership.update({

        where: {
          id,
        },

        data: {

          status:
            MembershipStatus.EXPIRED,

        },

        include: {
          member: true,
          plan: true,
        },

      });



    await this.audit.create({

      gymId,

      userId: undefined,

      action: AuditAction.DELETE,

      entity: 'Membership',

      entityId: id,

      description:
        `Finalizó la membresía de ${membership.member.firstName} ${membership.member.lastName}`,

      oldData: membership,

      newData: updated,

    });


    return updated;

  }

}