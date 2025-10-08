import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ReportType, ReportFormat } from '../entities/report.entity';

export class ReportFiltersDto {
  @ApiProperty({ required: false })
  @IsOptional()
  courseId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  studentId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  startDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  endDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  classId?: string;
}

export class CreateReportDto {
  @ApiProperty({
    enum: ReportType,
    example: ReportType.ATTENDANCE_SUMMARY,
    description: 'Tipo de reporte a generar',
  })
  @IsEnum(ReportType)
  @IsNotEmpty()
  type: ReportType;

  @ApiProperty({
    enum: ReportFormat,
    example: ReportFormat.PDF,
    description: 'Formato del reporte',
  })
  @IsEnum(ReportFormat)
  @IsNotEmpty()
  format: ReportFormat;

  @ApiProperty({
    type: ReportFiltersDto,
    required: false,
    description: 'Filtros para generar el reporte',
  })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ReportFiltersDto)
  filters?: ReportFiltersDto;
}
