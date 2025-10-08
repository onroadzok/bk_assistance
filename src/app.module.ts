import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { getDatabaseConfig } from './config/database.config';
import { getRedisConfig } from './config/redis.config';
import { ReportsModule } from './modules/reports/reports.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { EventsModule } from './modules/events/events.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getDatabaseConfig,
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: getRedisConfig,
    }),
    ReportsModule,
    AnalyticsModule,
    EventsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
