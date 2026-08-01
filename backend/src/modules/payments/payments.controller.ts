import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags, } from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';

import { PaymentsService } from './payments.service';

import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';



@Controller('payments')
@UseGuards(AuthGuard('jwt'))
export class PaymentsController {


  constructor(
    private readonly paymentsService: PaymentsService,
  ) {}


  @ApiOperation({ summary: 'Listar todos los pagos' })
  @Get()
  findAll(
    @Req() req: any,

    @Query('page')
    page = '1',

    @Query('limit')
    limit = '10',

    @Query('search')
    search = '',
  ) {

    const pageNumber =
      Math.max(
        Number(page) || 1,
        1,
      );

    const limitNumber =
      Math.min(
        Math.max(
          Number(limit) || 10,
          1,
        ),
        100,
      );

    return this.paymentsService.findAll(

      req.user.gymId,
      pageNumber,
      limitNumber,
      search.trim(),
    );
  }



  @ApiOperation({ summary: 'Obtener un pago por ID' })
  @Get(':id')
  findOne(
    @Req() req:any,
    @Param('id') id:string,
  ) {

    return this.paymentsService.findOne(
      id,
      req.user.gymId,
    );

  }




  @ApiOperation({ summary: 'Registrar un nuevo pago' })
  @Post()
  create(
    @Req() req:any,
    @Body() dto:CreatePaymentDto,
  ) {

    return this.paymentsService.create(
      req.user,
      dto,
    );

  }




  @ApiOperation({ summary: 'Actualizar un pago' })
  @Patch(':id')
  update(
    @Req() req:any,
    @Param('id') id:string,
    @Body() dto:UpdatePaymentDto,
  ) {

    return this.paymentsService.update(
      id,
      req.user.gymId,
      dto,
    );

  }




  @ApiOperation({ summary: 'Eliminar un pago' })
  @Delete(':id')
  remove(
    @Req() req:any,
    @Param('id') id:string,
  ) {

    return this.paymentsService.remove(
      id,
      req.user.gymId,
    );

  }

}