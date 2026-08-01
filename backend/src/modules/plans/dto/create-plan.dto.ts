import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlanDto {
  @ApiProperty({
    example: 'Mensual',
  })
  @IsString()
  @MaxLength(100)
  name!: string;

  @ApiProperty({
    example: 'Acceso libre durante un mes',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 30,
  })
  @IsInt()
  @Min(1)
  durationDays!: number;

  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  active!: boolean;
}