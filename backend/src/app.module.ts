import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';


import { RolesGuard } from './common/guards/roles.guard';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { MembersModule } from './modules/members/members.module';
import { PlansModule } from './modules/plans/plans.module';
import { MembershipsModule } from './modules/memberships/memberships.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

import { AuditModule } from './modules/audit/audit.module';

@Module({
  imports: [ 
    ConfigModule.forRoot({ 
        isGlobal: true, 
      }),

    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 100,
        },
      ],
    }),

    PrismaModule, 
    AuthModule, 
    UsersModule, 
    MembersModule, 
    PlansModule, 
    MembershipsModule, 
    PaymentsModule, 
    InvoicesModule, 
    AttendanceModule, 
    DashboardModule, 
    AuditModule 
  ],

  controllers: [AppController],

  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
