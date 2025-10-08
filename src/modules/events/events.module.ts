import { Module } from '@nestjs/common';
import { AttendanceConsumer } from './consumers/attendance.consumer';
import { ReportConsumer } from './consumers/report.consumer';
import { ReportsModule } from '../reports/reports.module';
import { AnalyticsModule } from '../analytics/analytics.module';

@Module({
  imports: [ReportsModule, AnalyticsModule],
  controllers: [AttendanceConsumer, ReportConsumer],
})
export class EventsModule {}
