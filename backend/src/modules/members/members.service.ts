import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { AuditAction } from '@prisma/client';
import { AuditLogService } from '../../common/services/audit-log.service';

import { FindMembersDto } from './dto/find-members.dto';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

import { MemberStatus } from '@prisma/client';

@Injectable()
export class MembersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditLogService,
  ) {}

  async findAll(
    gymId: string,
    query: FindMembersDto,
  ) {
    const page = query.page;
    const limit = query.limit;

    const where: any = {
      gymId,
    };

    if (query.status) {
      where.status = query.status;
    }

    if (query.search) {
      where.OR = [
        {
          firstName: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
        {
          lastName: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
        {
          dni: {
            contains: query.search,
          },
        },
      ];
    }

    const [items, total] =
      await this.prisma.$transaction([
        this.prisma.member.findMany({
          where,
          skip: (page - 1) * limit,
          take: limit,
          orderBy: {
            lastName: 'asc',
          },
        }),

        this.prisma.member.count({
          where,
        }),
      ]);

    return {
      items,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  }

  async findOne(
    id: string,
    gymId: string,
  ) {
    const member =
      await this.prisma.member.findFirst({
        where: {
          id,
          gymId,
        },
        include: {
          memberships: {
            include: {
              plan: true,
            },
          },
          attendances: {
            orderBy: {
              checkIn: 'desc',
            },
            take: 30,
          },
        },
      });

    if (!member) {
      throw new NotFoundException(
        'Socio no encontrado',
      );
    }

    return member;
  }

  async create(
    user: any,
    dto: CreateMemberDto,
  ) {
    if (dto.dni) {
      const exists =
        await this.prisma.member.findUnique({
          where: {
            dni: dto.dni,
          },
        });

      if (exists) {
        throw new BadRequestException(
          'Ya existe un socio con ese DNI',
        );
      }
    }

    const member = await this.prisma.member.create({
      data: {
        gymId: user.gymId,
        createdById: user.id,

        firstName: dto.firstName,
        lastName: dto.lastName,

        dni: dto.dni,
        email: dto.email?.toLowerCase(),

        phone: dto.phone,
        address: dto.address,

        birthDate: dto.birthDate
          ? new Date(dto.birthDate)
          : undefined,

        emergencyContact: dto.emergencyContact,
        emergencyPhone: dto.emergencyPhone,

        physicalProblems: dto.physicalProblems,
        cardiacProblems: dto.cardiacProblems,

        notes: dto.notes,
      },
    });

    await this.audit.create({
      gymId: user.gymId,
      userId: user.id,
      action: AuditAction.CREATE,
      entity: 'Member',
      entityId: member.id,
      description: `Creó el socio ${member.firstName} ${member.lastName}`,
      newData: member,
    });

    return member;
  }

  async update(
    id: string,
    gymId: string,
    dto: UpdateMemberDto,
  ) {
    const member =
      await this.prisma.member.findFirst({
        where: {
          id,
          gymId,
        },
      });

    if (!member) {
      throw new NotFoundException(
        'Socio no encontrado',
      );
    }

    const updated = await this.prisma.member.update({
      where: {
        id,
      },
      data: {
        ...dto,
        email: dto.email?.toLowerCase(),
        birthDate: dto.birthDate
          ? new Date(dto.birthDate)
          : undefined,
      },
    });

    await this.audit.create({
      gymId,
      action: AuditAction.UPDATE,
      entity: 'Member',
      entityId: updated.id,
      description: `Actualizó el socio ${updated.firstName} ${updated.lastName}`,
      oldData: member,
      newData: updated,
    });

    return updated;
  }

  async remove(
    id: string,
    gymId: string,
  ) {
    const member =
      await this.prisma.member.findFirst({
        where: {
          id,
          gymId,
        },
      });

    if (!member) {
      throw new NotFoundException(
        'Socio no encontrado',
      );
    }

    const deleted = await this.prisma.member.update({
      where: {
        id,
      },
      data: {
        status:
          member.status === MemberStatus.ACTIVE
            ? MemberStatus.INACTIVE
            : MemberStatus.ACTIVE,
      },
    });

    await this.audit.create({
      gymId,
      action: AuditAction.DELETE,
      entity: 'Member',
      entityId: deleted.id,
      description: `Desactivó el socio ${member.firstName} ${member.lastName}`,
      oldData: member,
      newData: deleted,
    });

    return deleted;
  }
}