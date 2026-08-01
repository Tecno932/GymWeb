import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';

import { MembershipsController } from './memberships.controller';
import { MembershipsService } from './memberships.service';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [
    PrismaModule,
    CommonModule,
  ],
  controllers: [MembershipsController],
  providers: [MembershipsService],
  exports: [MembershipsService],
})
export class MembershipsModule {}