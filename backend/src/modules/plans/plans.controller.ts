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

import { PlansService } from './plans.service';

import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('plans')
@UseGuards(AuthGuard('jwt'))
export class PlansController {
  constructor(
    private readonly plansService: PlansService,
  ) {}

  @ApiOperation({ summary: 'Listar todos los planes' })
  @Get()
  findAll(@Req() req: any) {
    return this.plansService.findAll(req.user.gymId);
  }

  @ApiOperation({ summary: 'Obtener un plan por ID' })
  @Get(':id')
  findOne(
    @Req() req: any,
    @Param('id') id: string,
  ) {
    return this.plansService.findOne(
      id,
      req.user.gymId,
    );
  }

  @Roles(
    UserRole.OWNER,
    UserRole.ADMIN,
  )
  @ApiOperation({ summary: 'Crear un nuevo plan' })
  @Post()
  create(
    @Req() req:any,
    @Body() dto:CreatePlanDto,
  ){
    return this.plansService.create(
      req.user,
      dto,
    );
  }

  @ApiOperation({ summary: 'Actualizar un plan' })
  @Patch(':id')
  update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: UpdatePlanDto,
  ) {
    return this.plansService.update(
      id,
      req.user.gymId,
      dto,
    );
  }

  @ApiOperation({ summary: 'Eliminar un plan' })
  @Delete(':id')
  remove(
    @Req() req: any,
    @Param('id') id: string,
  ) {
    return this.plansService.remove(
      id,
      req.user.gymId,
    );
  }
}