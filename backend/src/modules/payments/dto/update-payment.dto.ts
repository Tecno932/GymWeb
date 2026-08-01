import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';

import { PaymentMethod } from '@prisma/client';


export class UpdatePaymentDto {

  @IsOptional()
  @IsNumber()
  amount?: number;


  @IsOptional()
  @IsEnum(PaymentMethod)
  method?: PaymentMethod;


  @IsOptional()
  @IsString()
  observations?: string;


  @IsOptional()
  @IsDateString()
  paidAt?: string;
}