import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';

import { PlansController } from './plans.controller';
import { PlansService } from './plans.service';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [
    PrismaModule,
    CommonModule,
  ],
  controllers: [PlansController],
  providers: [PlansService],
  exports: [PlansService],
})
export class PlansModule {}