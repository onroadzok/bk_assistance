import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportQueryDto } from './dto/report-query.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles, UserRole } from '../../common/decorators/roles.decorator';
import { User } from '../../common/decorators/user.decorator';

@ApiTags('Reports')
@ApiBearerAuth()
@Controller('api/reports')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post('generate')
  @Roles(UserRole.ADMIN, UserRole.PROFESOR)
  @ApiOperation({ summary: 'Generar un nuevo reporte' })
  @ApiResponse({
    status: 201,
    description: 'Reporte creado y en cola para procesamiento',
  })
  async create(
    @Body() createReportDto: CreateReportDto,
    @User('userId') userId: string,
  ) {
    const report = await this.reportsService.create(createReportDto, userId);
    return {
      reportId: report.id,
      status: report.status,
      message: 'Reporte en cola de generación',
    };
  }

  @Get()
  @ApiOperation({ summary: 'Listar reportes del usuario' })
  @ApiResponse({ status: 200, description: 'Lista de reportes con paginación' })
  findAll(@Query() query: ReportQueryDto, @User('userId') userId: string) {
    return this.reportsService.findAll(query, userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalle de un reporte' })
  @ApiResponse({ status: 200, description: 'Detalle del reporte' })
  @ApiResponse({ status: 404, description: 'Reporte no encontrado' })
  findOne(@Param('id') id: string, @User('userId') userId: string) {
    return this.reportsService.findOne(id, userId);
  }

  @Get(':id/download')
  @ApiOperation({ summary: 'Descargar archivo del reporte' })
  @ApiResponse({ status: 200, description: 'Archivo descargado' })
  @ApiResponse({ status: 404, description: 'Archivo no disponible' })
  async download(
    @Param('id') id: string,
    @User('userId') userId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { stream, filename } = await this.reportsService.getFileStream(id, userId);

    const extension = filename.split('.').pop();
    const contentType =
      extension === 'pdf' ? 'application/pdf' : 'text/csv';

    res.set({
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${filename}"`,
    });

    return new StreamableFile(stream);
  }
}
