import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
} from 'class-validator';

import { InvoiceStatus } from '@prisma/client';


export class UpdateInvoiceDto {

  @IsOptional()
  @IsNumber()
  amount?: number;


  @IsOptional()
  @IsDateString()
  dueDate?: string;


  @IsOptional()
  @IsEnum(InvoiceStatus)
  status?: InvoiceStatus;

}