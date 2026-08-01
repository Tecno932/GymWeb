import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMembershipDto {
  @ApiProperty({
    example: 'cm123456789',
  })
  @IsString()
  memberId!: string;

  @ApiProperty({
    example: 'cm987654321',
  })
  @IsString()
  planId!: string;

  @ApiProperty({
    example: 25000,
  })
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiProperty({
    example: '2026-07-01',
  })
  @IsDateString()
  startDate!: string;

  @ApiProperty({
    example: '2026-07-31',
  })
  @IsDateString()
  endDate!: string;

  @ApiProperty({
    example: 'Pago en efectivo',
    required: false,
  })
  @IsOptional()
  @IsString()
  observations?: string;
}