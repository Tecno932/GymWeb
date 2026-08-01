import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';


@Injectable()
export class AuditService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}


  async findAll(gymId: string) {

    return this.prisma.auditLog.findMany({

      where: {
        gymId,
      },

      include: {

        user: {
          select: {
            id: true,
            name: true,
            lastname: true,
            email: true,
            role: true,
          },
        },

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

    const log =
      await this.prisma.auditLog.findFirst({

        where: {
          id,
          gymId,
        },

        include: {
          user: true,
        },

      });


    if (!log) {

      throw new NotFoundException(
        'Registro de auditoría no encontrado',
      );

    }


    return log;

  }



  async create(data: {

    gymId: string;

    userId?: string;

    action:
      | 'CREATE'
      | 'UPDATE'
      | 'DELETE'
      | 'LOGIN'
      | 'LOGOUT';

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