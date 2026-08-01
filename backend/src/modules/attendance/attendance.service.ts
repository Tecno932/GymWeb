import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { CheckoutAttendanceDto } from './dto/checkout-attendance.dto';


@Injectable()
export class AttendanceService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}



  async findAll(gymId: string) {

    return this.prisma.attendance.findMany({

      where: {

        member: {
          gymId,
        },

      },

      include: {

        member: {

          select: {

            id: true,

            firstName: true,

            lastName: true,

            dni: true,

          },

        },

      },

      orderBy: {

        checkIn: 'desc',

      },

    });

  }




  async findByMember(
    memberId: string,
    gymId: string,
  ) {


    return this.prisma.attendance.findMany({

      where: {

        memberId,

        member: {

          gymId,

        },

      },

      orderBy: {

        checkIn: 'desc',

      },

    });

  }




  async create(
    user: any,
    dto: CreateAttendanceDto,
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



    const openAttendance =
      await this.prisma.attendance.findFirst({

        where: {

          memberId: dto.memberId,

          checkOut: null,

        },

      });



    if (openAttendance) {

      throw new BadRequestException(
        'El socio ya tiene una entrada activa',
      );

    }



    return this.prisma.attendance.create({

      data: {

        memberId: dto.memberId,

      },

    });

  }





  async checkout(
    id: string,
    gymId: string,
    dto: CheckoutAttendanceDto,
  ) {


    const attendance =
      await this.prisma.attendance.findFirst({

        where: {

          id,

          member: {

            gymId,

          },

        },

      });



    if (!attendance) {

      throw new NotFoundException(
        'Registro de asistencia no encontrado',
      );

    }




    if (attendance.checkOut) {

      throw new BadRequestException(
        'La salida ya fue registrada',
      );

    }



    return this.prisma.attendance.update({

      where: {

        id,

      },

      data: {

        checkOut: dto.checkOut
          ? new Date(dto.checkOut)
          : new Date(),

      },

    });

  }





  async remove(
    id: string,
    gymId: string,
  ) {


    const attendance =
      await this.prisma.attendance.findFirst({

        where: {

          id,

          member: {

            gymId,

          },

        },

      });



    if (!attendance) {

      throw new NotFoundException(
        'Registro de asistencia no encontrado',
      );

    }



    return this.prisma.attendance.delete({

      where: {

        id,

      },

    });

  }

}