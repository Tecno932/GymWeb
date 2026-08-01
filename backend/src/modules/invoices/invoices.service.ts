import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';


@Injectable()
export class InvoicesService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}



  async findAll(gymId:string) {

    return this.prisma.invoice.findMany({

      where:{
        membership:{
          member:{
            gymId,
          },
        },
      },

      include:{
        membership:{
          include:{
            member:true,
            plan:true,
          },
        },

        payments:true,
      },

      orderBy:{
        createdAt:'desc',
      },

    });

  }





  async findOne(
    id:string,
    gymId:string,
  ) {

    const invoice =
      await this.prisma.invoice.findFirst({

        where:{
          id,

          membership:{
            member:{
              gymId,
            },
          },
        },

        include:{
          membership:{
            include:{
              member:true,
              plan:true,
            },
          },

          payments:true,
        },

      });


    if(!invoice){

      throw new NotFoundException(
        'Factura no encontrada',
      );

    }


    return invoice;

  }





  async create(
    user:any,
    dto:CreateInvoiceDto,
  ) {


    const membership =
      await this.prisma.membership.findFirst({

        where:{
          id:dto.membershipId,

          member:{
            gymId:user.gymId,
          },
        },

      });


    if(!membership){

      throw new BadRequestException(
        'La membresía no existe',
      );

    }



    return this.prisma.invoice.create({

      data:{

        membershipId:dto.membershipId,

        amount:dto.amount,

        dueDate:new Date(dto.dueDate),

        status:dto.status,

      },

    });

  }





  async update(
    id:string,
    gymId:string,
    dto:UpdateInvoiceDto,
  ){

    await this.findOne(
      id,
      gymId,
    );


    return this.prisma.invoice.update({

      where:{
        id,
      },

      data:{

        amount:dto.amount,

        dueDate:dto.dueDate
          ? new Date(dto.dueDate)
          : undefined,

        status:dto.status,

      },

    });

  }





  async remove(
    id:string,
    gymId:string,
  ){

    await this.findOne(
      id,
      gymId,
    );


    return this.prisma.invoice.delete({

      where:{
        id,
      },

    });

  }

}