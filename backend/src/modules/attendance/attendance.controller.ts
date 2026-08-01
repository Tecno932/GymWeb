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

import { AttendanceService } from './attendance.service';

import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { CheckoutAttendanceDto } from './dto/checkout-attendance.dto';



@Controller('attendance')
@UseGuards(AuthGuard('jwt'))
export class AttendanceController {


  constructor(
    private readonly attendanceService: AttendanceService,
  ) {}


  @ApiOperation({ summary: 'Listar todas las asistencias' })
  @Get()
  findAll(
    @Req() req:any,
  ) {

    return this.attendanceService.findAll(
      req.user.gymId,
    );

  }




  @ApiOperation({ summary: 'Obtener asistencias de un socio' })
  @Get('member/:memberId')
  findByMember(
    @Req() req:any,
    @Param('memberId') memberId:string,
  ) {

    return this.attendanceService.findByMember(
      memberId,
      req.user.gymId,
    );

  }




  @ApiOperation({ summary: 'Registrar ingreso de un socio' })
  @Post()
  create(
    @Req() req:any,
    @Body() dto:CreateAttendanceDto,
  ) {

    return this.attendanceService.create(
      req.user,
      dto,
    );

  }




  @ApiOperation({ summary: 'Registrar salida de un socio' })
  @Patch(':id/checkout')
  checkout(
    @Req() req:any,
    @Param('id') id:string,
    @Body() dto:CheckoutAttendanceDto,
  ) {

    return this.attendanceService.checkout(
      id,
      req.user.gymId,
      dto,
    );

  }




  @ApiOperation({ summary: 'Eliminar un registro de asistencia' })
  @Delete(':id')
  remove(
    @Req() req:any,
    @Param('id') id:string,
  ) {

    return this.attendanceService.remove(
      id,
      req.user.gymId,
    );

  }

}