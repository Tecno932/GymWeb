import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditAction } from '@prisma/client';

@Injectable()
export class AuditLogService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(data: {
    gymId: string;
    userId?: string;
    action: AuditAction;
    entity: string;
    entityId: string;
    description?: string;
    oldData?: any;
    newData?: any;
    ipAddress?: string;
    userAgent?: string;
  }) {
    return this.prisma.auditLog.create({
      data,
    });
  }
}