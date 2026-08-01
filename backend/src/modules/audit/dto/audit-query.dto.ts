import {
  IsEnum,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';

import { AuditAction } from '@prisma/client';


export class AuditQueryDto {

  @IsOptional()
  @IsEnum(AuditAction)
  action?: AuditAction;


  @IsOptional()
  @IsString()
  entity?: string;


  @IsOptional()
  @IsDateString()
  from?: string;


  @IsOptional()
  @IsDateString()
  to?: string;

}