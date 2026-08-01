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

import { MembershipsService } from './memberships.service';

import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';

@Controller('memberships')
@UseGuards(AuthGuard('jwt'))
export class MembershipsController {
  constructor(
    private readonly membershipsService: MembershipsService,
  ) {}

  @ApiOperation({ summary: 'Listar todas las membresías' })
  @Get()
  findAll(@Req() req: any) {
    return this.membershipsService.findAll(
      req.user.gymId,
    );
  }

  @ApiOperation({ summary: 'Obtener una membresía por ID' })
  @Get(':id')
  findOne(
    @Req() req: any,
    @Param('id') id: string,
  ) {
    return this.membershipsService.findOne(
      id,
      req.user.gymId,
    );
  }

  @ApiOperation({ summary: 'Crear una nueva membresía' })
  @Post()
  create(
    @Req() req: any,
    @Body() dto: CreateMembershipDto,
  ) {
    return this.membershipsService.create(
      req.user,
      dto,
    );
  }

  @ApiOperation({ summary: 'Actualizar una membresía' })
  @Patch(':id')
  update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: UpdateMembershipDto,
  ) {
    return this.membershipsService.update(
      id,
      req.user.gymId,
      dto,
    );
  }

  @ApiOperation({ summary: 'Cancelar una membresía' })
  @Delete(':id')
  remove(
    @Req() req: any,
    @Param('id') id: string,
  ) {
    return this.membershipsService.remove(
      id,
      req.user.gymId,
    );
  }
}