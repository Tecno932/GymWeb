import {
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags, } from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';

import { DashboardService } from './dashboard.service';


@Controller('dashboard')
@UseGuards(AuthGuard('jwt'))
export class DashboardController {

  constructor(
    private readonly dashboardService: DashboardService,
  ) {}


  @ApiOperation({ summary: 'Obtener estadísticas generales del gimnasio' })
  @Get()
  getDashboard(
    @Req() req: any,
  ) {

    return this.dashboardService.getDashboard(
      req.user.gymId,
    );

  }

}