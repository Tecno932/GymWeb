import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SetupDto } from './dto/setup.dto';
import { SetupStatusDto } from './dto/setup-status.dto';
import { LoginDto } from './dto/login.dto';
import { Throttle } from '@nestjs/throttler';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Estado de configuración',})
  @Get('setup/status')
  getSetupStatus(): Promise<SetupStatusDto> {
    return this.authService.getSetupStatus();
  }

  @ApiOperation({ summary: 'Configuración inicial', })
  @Throttle({ default: { limit: 2, ttl: 60000, }, })
  @Post('setup')
  setup(@Body() dto: SetupDto) {
    return this.authService.setup(dto);
  }

  @ApiOperation({ summary: 'Login del sistema', })
  @Throttle({ default: { limit: 5, ttl: 60000, }, })
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}