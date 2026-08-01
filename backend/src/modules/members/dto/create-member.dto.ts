import {
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMemberDto {
  @ApiProperty({
    example: 'Nahuel',
    description: 'Nombre del socio',
  })
  @IsString()
  @MaxLength(100)
  firstName!: string;

  @ApiProperty({
    example: 'Pérez',
    description: 'Apellido del socio',
  })
  @IsString()
  @MaxLength(100)
  lastName!: string;

  @ApiProperty({
    example: '42123456',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  dni?: string;

  @ApiProperty({
    example: 'nahuel@gmail.com',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    example: '3435123456',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  phone?: string;

  @ApiProperty({
    example: 'Entre Ríos',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  address?: string;

  @ApiProperty({
    example: '2003-04-12',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  birthDate?: string;

@ApiProperty({
  example: 'María Pérez',
  required: false,
})
  @IsOptional()
  @IsString()
  @MaxLength(100)
  emergencyContact?: string;

  @ApiProperty({
    example: '3435000000',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  emergencyPhone?: string;

  @ApiProperty({
    example: 'Asma',
    required: false,
  })
  @IsOptional()
  @IsString()
  physicalProblems?: string;

  @ApiProperty({
    example: 'Ninguno',
    required: false,
  })
  @IsOptional()
  @IsString()
  cardiacProblems?: string;

  @ApiProperty({
    example: 'Primer ingreso',
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;
}