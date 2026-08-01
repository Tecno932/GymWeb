import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags, } from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';

import { MembersService } from './members.service';

import { FindMembersDto } from './dto/find-members.dto';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Controller('members')
@UseGuards(AuthGuard('jwt'))
export class MembersController {
  constructor(
    private readonly membersService: MembersService,
  ) {}

  @ApiOperation({ summary: 'Listar todos los socios' })
  @Get()
  findAll(
    @Req() req: any,
    @Query() query: FindMembersDto,
  ) {
    return this.membersService.findAll(
      req.user.gymId,
      query,
    );
  }

  @ApiOperation({ summary: 'Obtener un socio por ID' })
  @Get(':id')
  findOne(
    @Req() req: any,
    @Param('id') id: string,
  ) {
    return this.membersService.findOne(
      id,
      req.user.gymId,
    );
  }

  @ApiOperation({ summary: 'Registrar un nuevo socio' })
  @Post()
  create(
    @Req() req: any,
    @Body() dto: CreateMemberDto,
  ) {
    return this.membersService.create(req.user, dto);
  }

  @ApiOperation({ summary: 'Actualizar un socio' })
  @Patch(':id')
  update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: UpdateMemberDto,
  ) {
    return this.membersService.update(
      id,
      req.user.gymId,
      dto,
    );
  }

  @ApiOperation({ summary: 'Dar de baja un socio' })
  @Delete(':id')
  remove(
    @Req() req: any,
    @Param('id') id: string,
  ) {
    return this.membersService.remove(
      id,
      req.user.gymId,
    );
  }
}