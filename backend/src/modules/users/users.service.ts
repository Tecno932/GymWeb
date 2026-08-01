import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { AuditAction } from '@prisma/client';
import { AuditLogService } from '../../common/services/audit-log.service';

import { CreateUserDto } from './dto/create-user.dto';

import { UpdateUserDto } from './dto/update-user.dto';

import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {


constructor(
 private readonly prisma: PrismaService,
 private readonly audit: AuditLogService,
){}



async findAll(gymId:string){

 return this.prisma.user.findMany({
  where:{
    gymId
  },
  select:{
    id:true,
    name:true,
    lastname:true,
    email:true,
    role:true,
    active:true,
    createdAt:true,
  }
 });

}



async findOne(id:string){

 const user =
 await this.prisma.user.findUnique({
  where:{
    id
  }
 });


 if(!user)
  throw new NotFoundException(
   'Usuario no encontrado'
  );


 return user;

}




async create(
 gymId:string,
 dto:CreateUserDto
){

 const password =
 await bcrypt.hash(dto.password,12);


 return this.prisma.user.create({

 data:{
  gymId,

  name:dto.name,

  lastname:dto.lastname,

  email:dto.email.toLowerCase(),

  password,

  role:dto.role,

 }

 });

}




async update(
 id:string,
 dto:UpdateUserDto
){

 return this.prisma.user.update({

 where:{
  id
 },

 data:dto

 });

}



async remove(id:string){

 return this.prisma.user.update({

 where:{
  id
 },

 data:{
  active:false
 }

 });

}



}