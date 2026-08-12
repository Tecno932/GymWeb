import {
  Controller,
  Get,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';

import { ReportsService } from './reports.service';

@ApiTags('Reports')
@ApiBearerAuth()
@Controller('reports')
@UseGuards(AuthGuard('jwt'))
export class ReportsController {

  constructor(
    private readonly reportsService: ReportsService,
  ) {}

  @ApiOperation({
    summary: 'Reporte de ingresos',
  })
  @Get('revenue')
  getRevenue(
    @Req() req: any,

    @Query('from')
    from?: string,

    @Query('to')
    to?: string,
  ) {

    return this.reportsService.getRevenue(
      req.user.gymId,
      from,
      to,
    );

  }

  @ApiOperation({
    summary: 'Reporte de socios',
  })
  @Get('members')
  getMembers(
    @Req() req: any,
  ) {

    return this.reportsService.getMembers(
      req.user.gymId,
    );

  }

  @ApiOperation({
    summary: 'Reporte de asistencias',
  })
  @Get('attendance')
  getAttendance(
    @Req() req: any,
  ) {

    return this.reportsService.getAttendance(
      req.user.gymId,
    );

  }

  @ApiOperation({
    summary: 'Membresías próximas a vencer',
  })
  @Get('expiring-memberships')
  getExpiringMemberships(
    @Req() req: any,
  ) {

    return this.reportsService.getExpiringMemberships(
      req.user.gymId,
    );

  }

  @ApiOperation({
    summary: 'Socios deudores',
  })
  @Get('debtors')
  getDebtors(
    @Req() req: any,
  ) {

    return this.reportsService.getDebtors(
      req.user.gymId,
    );

  }

}