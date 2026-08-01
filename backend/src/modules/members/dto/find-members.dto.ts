import {
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { MemberStatus } from '@prisma/client';

export class FindMembersDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit = 20;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  status?: MemberStatus;
}