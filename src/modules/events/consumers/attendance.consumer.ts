import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AnalyticsService } from '../../analytics/analytics.service';

@Controller()
export class AttendanceConsumer {
  constructor(private analyticsService: AnalyticsService) {}

  @EventPattern('AsistenciaRegistrada')
  async handleAttendanceRegistered(@Payload() data: any) {
    await this.analyticsService.updateStatsCache(data);
  }
}
