import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SetupDto } from './dto/setup.dto';
import { LoginDto } from './dto/login.dto';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async getSetupStatus() {
    const owner = await this.prisma.user.findFirst({
      where: {
        role: UserRole.OWNER,
      },
      select: {
        id: true,
      },
    });

    return {
      configured: owner !== null,
    };
  }

  async setup(dto: SetupDto) {
    const owner = await this.prisma.user.findFirst({
      where: {
        role: UserRole.OWNER,
      },
    });

    if (owner) {
      throw new BadRequestException(
        'El sistema ya fue configurado.',
      );
    }

    const password = await bcrypt.hash(dto.password, 12);

    return this.prisma.$transaction(async (tx) => {
      const gym = await tx.gym.create({
        data: {
          name: dto.gymName,
        },
      });

      const user = await tx.user.create({
        data: {
          gymId: gym.id,
          name: dto.firstName,
          lastname: dto.lastName,
          email: dto.email.toLowerCase(),
          password,
          role: UserRole.OWNER,
        },
      });

      return {
        success: true,
        gym,
        user,
      };
    });
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email.toLowerCase(),
      },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const valid = await bcrypt.compare(
      dto.password,
      user.password,
    );

    if (!valid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const token = await this.jwt.signAsync({
      sub: user.id,
      gymId: user.gymId,
      role: user.role,
    });

    return {
      accessToken: token,
    };
  }
}