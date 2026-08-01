import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { InvoiceStatus } from '@prisma/client';


export class CreateInvoiceDto {

  @IsString()
  membershipId!: string;


  @IsNumber()
  amount!: number;


  @IsDateString()
  dueDate!: string;


  @IsOptional()
  @IsEnum(InvoiceStatus)
  status?: InvoiceStatus;

}