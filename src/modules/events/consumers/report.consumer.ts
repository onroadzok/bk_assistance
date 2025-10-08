import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { ReportsService } from '../../reports/reports.service';

@Controller()
export class ReportConsumer {
  private readonly logger = new Logger(ReportConsumer.name);

  constructor(private reportsService: ReportsService) {}

  @EventPattern('ReportRequested')
  async handleReportRequested(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      await this.reportsService.processReport(data.reportId);
      channel.ack(originalMsg);
    } catch (error) {
      this.logger.error(`Error processing report: ${error.message}`);
      channel.nack(originalMsg, false, true);
    }
  }
}
