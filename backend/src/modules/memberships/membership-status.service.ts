import {
  Injectable,
} from "@nestjs/common";

import {
  MembershipStatus,
} from "@prisma/client";

import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class MembershipStatusService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async synchronize(
    gymId: string,
  ) {

    const today = new Date();

    today.setHours(
      0,
      0,
      0,
      0,
    );

    /*
     * Todas las vencidas pasan
     * automáticamente a EXPIRED.
     */
    await this.prisma.membership.updateMany({

      where: {

        status: MembershipStatus.ACTIVE,

        endDate: {

          lt: today,

        },

        member: {

          gymId,

        },

      },

      data: {

        status: MembershipStatus.EXPIRED,

      },

    });




    /*
     * Si una membresía fue reactivada
     * manualmente o corregimos la fecha,
     * vuelve a ACTIVE.
     */

    await this.prisma.membership.updateMany({

      where: {

        status: MembershipStatus.EXPIRED,

        endDate: {

          gte: today,

        },

        member: {

          gymId,

        },

      },

      data: {

        status: MembershipStatus.ACTIVE,

      },

    });

  }

}