import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { AuditAction } from '@prisma/client';
import { AuditLogService } from '../../common/services/audit-log.service';

import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Injectable()
export class PlansService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditLogService,
  ) {}

  async findAll(gymId: string) {
    return this.prisma.plan.findMany({
      where: {
        gymId,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(
    id: string,
    gymId: string,
  ) {
    const plan = await this.prisma.plan.findFirst({
      where: {
        id,
        gymId,
      },
    });

    if (!plan) {
      throw new NotFoundException(
        'Plan no encontrado',
      );
    }

    return plan;
  }

  async create(
    user: any,
    dto: CreatePlanDto,
  ) {
    const exists = await this.prisma.plan.findFirst({
      where: {
        gymId: user.gymId,
        name: dto.name,
      },
    });

    if (exists) {
      throw new ConflictException(
        'Ya existe un plan con ese nombre',
      );
    }

    const plan = await this.prisma.plan.create({
      data: {
        gymId: user.gymId,
        name: dto.name,
        description: dto.description,
        durationDays: dto.durationDays,
        active: dto.active,
      },
    });

    await this.audit.create({
      gymId: user.gymId,
      userId: user.id,
      action: AuditAction.CREATE,
      entity: 'Plan',
      entityId: plan.id,
      description: `Creó el plan "${plan.name}"`,
      newData: plan,
    });

    return plan;
  }

  async update(
    id: string,
    gymId: string,
    dto: UpdatePlanDto,
  ) {
    const plan = await this.prisma.plan.findFirst({
      where: {
        id,
        gymId,
      },
    });

    if (!plan) {
      throw new NotFoundException(
        'Plan no encontrado',
      );
    }

    if (
      dto.name &&
      dto.name !== plan.name
    ) {
      const exists = await this.prisma.plan.findFirst({
        where: {
          gymId,
          name: dto.name,
          NOT: {
            id,
          },
        },
      });

      if (exists) {
        throw new ConflictException(
          'Ya existe un plan con ese nombre',
        );
      }
    }

    const updated = await this.prisma.plan.update({
      where: {
        id,
      },
      data: dto,
    });

    await this.audit.create({
      gymId,
      action: AuditAction.UPDATE,
      entity: 'Plan',
      entityId: updated.id,
      description: `Actualizó el plan "${updated.name}"`,
      oldData: plan,
      newData: updated,
    });

    return updated;
  }

  async remove(
    id: string,
    gymId: string,
  ) {
    const plan = await this.prisma.plan.findFirst({
      where: {
        id,
        gymId,
      },
    });

    if (!plan) {
      throw new NotFoundException(
        'Plan no encontrado',
      );
    }

    const deleted = await this.prisma.plan.update({
      where: {
        id,
      },
      data: {
        active: false,
      },
    });

    await this.audit.create({
      gymId,
      action: AuditAction.DELETE,
      entity: 'Plan',
      entityId: deleted.id,
      description: `Desactivó el plan "${plan.name}"`,
      oldData: plan,
      newData: deleted,
    });

    return deleted;
  }
}