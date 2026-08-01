import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { PaymentMethod } from '@prisma/client';

export class CreatePaymentDto {

  @ApiProperty({
    example: 'cmMembership123',
  })
  @IsString()
  @IsNotEmpty()
  membershipId!: string;

  @IsOptional()
  @IsString()
  invoiceId?: string;


  @ApiProperty({
    example: 25000,
  })
  @IsNumber()
  amount!: number;


  @ApiProperty({
    enum: PaymentMethod,
  })
  @IsEnum(PaymentMethod)
  method!: PaymentMethod;


  @ApiProperty({
    required: false,
    example: 'Pago completo',
  })
  @IsOptional()
  @IsString()
  observations?: string;


  @ApiProperty({
    required: false,
    example: '2026-07-28T10:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  paidAt?: string;

}