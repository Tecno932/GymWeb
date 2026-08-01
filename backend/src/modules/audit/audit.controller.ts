import {
  Controller,
  Get,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags, } from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';

import { AuditService } from './audit.service';

import { Roles } from '../../common/decorators/roles.decorator';

import { UserRole } from '@prisma/client';

import { RolesGuard } from '../../common/guards/roles.guard';

@Controller('audit')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AuditController {


  constructor(
    private readonly auditService: AuditService,
  ) {}


  @ApiOperation({ summary: 'Listar registros de auditoría' })
  @Get()
  @Roles(
    UserRole.OWNER,
    UserRole.ADMIN,
  )
  findAll(
    @Req() req:any,
  ) {

    return this.auditService.findAll(
      req.user.gymId,
    );

  }


  @ApiOperation({ summary: 'Obtener un registro de auditoría por ID' })
  @Get(':id')
  @Roles(
    UserRole.OWNER,
    UserRole.ADMIN,
  )
  findOne(
    @Req() req:any,
    @Param('id') id:string,
  ) {

    return this.auditService.findOne(
      id,
      req.user.gymId,
    );

  }

}