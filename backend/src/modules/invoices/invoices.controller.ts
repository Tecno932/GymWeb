import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags, } from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';

import { InvoicesService } from './invoices.service';

import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';


@Controller('invoices')
@UseGuards(AuthGuard('jwt'))
export class InvoicesController {

  constructor(
    private readonly invoicesService: InvoicesService,
  ) {}


  @ApiOperation({ summary: 'Listar todas las facturas' })
  @Get()
  findAll(
    @Req() req:any,
  ) {
    return this.invoicesService.findAll(
      req.user.gymId,
    );
  }


  @ApiOperation({ summary: 'Obtener una factura por ID' })
  @Get(':id')
  findOne(
    @Req() req:any,
    @Param('id') id:string,
  ) {

    return this.invoicesService.findOne(
      id,
      req.user.gymId,
    );

  }


  @ApiOperation({ summary: 'Generar una nueva factura' })
  @Post()
  create(
    @Req() req:any,
    @Body() dto:CreateInvoiceDto,
  ) {

    return this.invoicesService.create(
      req.user,
      dto,
    );

  }


  @ApiOperation({ summary: 'Actualizar una factura' })
  @Patch(':id')
  update(
    @Req() req:any,
    @Param('id') id:string,
    @Body() dto:UpdateInvoiceDto,
  ) {

    return this.invoicesService.update(
      id,
      req.user.gymId,
      dto,
    );

  }


  @ApiOperation({ summary: 'Eliminar una factura' })
  @Delete(':id')
  remove(
    @Req() req:any,
    @Param('id') id:string,
  ) {

    return this.invoicesService.remove(
      id,
      req.user.gymId,
    );

  }

}