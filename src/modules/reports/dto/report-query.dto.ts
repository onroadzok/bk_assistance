import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ReportType, ReportStatus } from '../entities/report.entity';

export class ReportQueryDto {
  @ApiProperty({ required: false, enum: ReportType })
  @IsOptional()
  @IsEnum(ReportType)
  type?: ReportType;

  @ApiProperty({ required: false, enum: ReportStatus })
  @IsOptional()
  @IsEnum(ReportStatus)
  status?: ReportStatus;

  @ApiProperty({ required: false, default: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiProperty({ required: false, default: 10, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @ApiProperty({ required: false })
  @IsOptional()
  startDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  endDate?: string;
}
