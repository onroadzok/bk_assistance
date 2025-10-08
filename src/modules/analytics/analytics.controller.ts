import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Analytics')
@ApiBearerAuth()
@Controller('api/analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Obtener estadísticas globales' })
  getDashboard() {
    return this.analyticsService.getDashboard();
  }

  @Get('course/:id')
  @ApiOperation({ summary: 'Obtener estadísticas por curso' })
  getCourseStats(@Param('id') id: string) {
    return this.analyticsService.getCourseStats(id);
  }
}
