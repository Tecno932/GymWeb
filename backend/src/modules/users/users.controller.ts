import {
 Controller,
 Get,
 Post,
 Body,
 Param,
 Patch,
 Delete,
 Req,
 UseGuards,
} from '@nestjs/common';


import { UsersService } from './users.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { CreateUserDto } from './dto/create-user.dto';

import { UpdateUserDto } from './dto/update-user.dto';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {


constructor(
 private readonly usersService:UsersService
){}



@ApiOperation({ summary: 'Listar todos los usuarios del gimnasio' })
@Get()
findAll(
 @Req() req:any
){

 return this.usersService.findAll(
  req.user.gymId
 );

}



@ApiOperation({ summary: 'Obtener un usuario por ID' })
@Get(':id')
findOne(
 @Param('id') id:string
){

 return this.usersService.findOne(id);

}




@ApiOperation({ summary: 'Crear un nuevo usuario' })
@Post()
create(
 @Req() req:any,
 @Body() dto:CreateUserDto
){

 return this.usersService.create(
  req.user.gymId,
  dto
 );

}



@ApiOperation({ summary: 'Actualizar un usuario' })
@Patch(':id')
update(
 @Param('id') id:string,
 @Body() dto:UpdateUserDto
){

 return this.usersService.update(
  id,
  dto
 );

}



@ApiOperation({ summary: 'Eliminar un usuario' })
@Delete(':id')
remove(
 @Param('id') id:string
){

 return this.usersService.remove(id);

}


}