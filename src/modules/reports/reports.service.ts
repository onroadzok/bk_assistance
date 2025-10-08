import { Injectable, NotFoundException, Logger, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import PDFDocument = require('pdfkit');
import { Parser } from 'json2csv';
import * as fs from 'fs';
import * as path from 'path';
import { Report, ReportStatus, ReportFormat } from './entities/report.entity';
import { Attendance } from '../attendance/entities/attendance.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportQueryDto } from './dto/report-query.dto';

@Injectable()
export class ReportsService {
  private readonly logger = new Logger(ReportsService.name);
  private readonly storagePath: string;

  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
    @Inject('RABBITMQ_SERVICE')
    private rabbitClient: ClientProxy,
    private configService: ConfigService,
  ) {
    this.storagePath = this.configService.get<string>('STORAGE_PATH', './uploads/reports');
    if (!fs.existsSync(this.storagePath)) {
      fs.mkdirSync(this.storagePath, { recursive: true });
    }
  }

  async create(createReportDto: CreateReportDto, userId: string): Promise<Report> {
    const report = this.reportRepository.create({
      ...createReportDto,
      requestedBy: userId,
      status: ReportStatus.PENDING,
    });

    const savedReport = await this.reportRepository.save(report);

    // Emit event to RabbitMQ
    this.rabbitClient.emit('ReportRequested', {
      reportId: savedReport.id,
      type: savedReport.type,
      format: savedReport.format,
      filters: savedReport.filters,
    });

    this.logger.log(`Report ${savedReport.id} created and queued`);
    return savedReport;
  }

  async findAll(query: ReportQueryDto, userId: string) {
    const { page, limit, type, status, startDate, endDate } = query;
    const skip = (page - 1) * limit;

    const queryBuilder = this.reportRepository
      .createQueryBuilder('report')
      .where('report.requestedBy = :userId', { userId });

    if (type) {
      queryBuilder.andWhere('report.type = :type', { type });
    }

    if (status) {
      queryBuilder.andWhere('report.status = :status', { status });
    }

    if (startDate && endDate) {
      queryBuilder.andWhere('report.createdAt BETWEEN :startDate AND :endDate', {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      });
    }

    const [reports, total] = await queryBuilder
      .orderBy('report.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      data: reports,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string, userId: string): Promise<Report> {
    const report = await this.reportRepository.findOne({
      where: { id, requestedBy: userId },
    });

    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }

    return report;
  }

  async processReport(reportId: string): Promise<void> {
    const report = await this.reportRepository.findOne({ where: { id: reportId } });
    if (!report) {
      this.logger.error(`Report ${reportId} not found`);
      return;
    }

    try {
      // Update status to PROCESSING
      report.status = ReportStatus.PROCESSING;
      await this.reportRepository.save(report);

      // Query attendance data based on filters
      const attendanceData = await this.queryAttendanceData(report.filters);

      // Generate file based on format
      let filePath: string;
      if (report.format === ReportFormat.PDF) {
        filePath = await this.generatePDF(reportId, attendanceData, report);
      } else if (report.format === ReportFormat.CSV) {
        filePath = await this.generateCSV(reportId, attendanceData);
      }

      // Update report with file URL
      report.status = ReportStatus.COMPLETED;
      report.fileUrl = filePath;
      await this.reportRepository.save(report);

      // Emit completion event
      this.rabbitClient.emit('ReportGenerated', {
        reportId: report.id,
        userId: report.requestedBy,
        fileUrl: filePath,
        format: report.format,
      });

      this.logger.log(`Report ${reportId} completed successfully`);
    } catch (error) {
      this.logger.error(`Error processing report ${reportId}:`, error.stack);
      report.status = ReportStatus.FAILED;
      report.errorMessage = error.message;
      await this.reportRepository.save(report);
    }
  }

  private async queryAttendanceData(filters: any): Promise<Attendance[]> {
    const queryBuilder = this.attendanceRepository.createQueryBuilder('attendance');

    if (filters?.courseId) {
      queryBuilder.andWhere('attendance.courseId = :courseId', {
        courseId: filters.courseId,
      });
    }

    if (filters?.studentId) {
      queryBuilder.andWhere('attendance.studentId = :studentId', {
        studentId: filters.studentId,
      });
    }

    if (filters?.classId) {
      queryBuilder.andWhere('attendance.classId = :classId', {
        classId: filters.classId,
      });
    }

    if (filters?.startDate && filters?.endDate) {
      queryBuilder.andWhere('attendance.createdAt BETWEEN :startDate AND :endDate', {
        startDate: new Date(filters.startDate),
        endDate: new Date(filters.endDate),
      });
    }

    return await queryBuilder.orderBy('attendance.createdAt', 'DESC').getMany();
  }

  private async generatePDF(
    reportId: string,
    data: Attendance[],
    report: Report,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileName = `${reportId}.pdf`;
      const filePath = path.join(this.storagePath, fileName);
      const doc = new PDFDocument({ margin: 50 });
      const stream = fs.createWriteStream(filePath);

      doc.pipe(stream);

      // Header
      doc.fontSize(20).text('AssitClass - Reporte de Asistencia', { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text(`Tipo: ${report.type}`, { align: 'left' });
      doc.text(`Generado: ${new Date().toLocaleString('es-ES')}`, { align: 'left' });
      doc.moveDown();

      // Table header
      doc.fontSize(10).font('Helvetica-Bold');
      const headers = ['Estudiante', 'Curso', 'Clase', 'Estado', 'Fecha/Hora'];
      const colWidth = 100;
      let xPos = 50;

      headers.forEach((header) => {
        doc.text(header, xPos, doc.y, { width: colWidth });
        xPos += colWidth;
      });

      doc.moveDown();
      doc.font('Helvetica');

      // Data rows
      data.forEach((record) => {
        xPos = 50;
        doc.text(record.studentId, xPos, doc.y, { width: colWidth });
        xPos += colWidth;
        doc.text(record.courseId, xPos, doc.y, { width: colWidth });
        xPos += colWidth;
        doc.text(record.classId, xPos, doc.y, { width: colWidth });
        xPos += colWidth;
        doc.text(record.status, xPos, doc.y, { width: colWidth });
        xPos += colWidth;
        doc.text(new Date(record.arrivalTime).toLocaleString('es-ES'), xPos, doc.y, {
          width: colWidth,
        });
        doc.moveDown(0.5);
      });

      // Footer
      doc.moveDown();
      doc.fontSize(10).text(`Total de registros: ${data.length}`, { align: 'center' });

      doc.end();

      stream.on('finish', () => resolve(fileName));
      stream.on('error', reject);
    });
  }

  private async generateCSV(reportId: string, data: Attendance[]): Promise<string> {
    const fileName = `${reportId}.csv`;
    const filePath = path.join(this.storagePath, fileName);

    const fields = [
      { label: 'ID', value: 'id' },
      { label: 'Estudiante ID', value: 'studentId' },
      { label: 'Curso ID', value: 'courseId' },
      { label: 'Clase ID', value: 'classId' },
      { label: 'Estado', value: 'status' },
      { label: 'Hora de Llegada', value: 'arrivalTime' },
      { label: 'Fecha Registro', value: 'createdAt' },
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(data);

    fs.writeFileSync(filePath, csv);
    return fileName;
  }

  async getFileStream(id: string, userId: string): Promise<{ stream: fs.ReadStream; filename: string }> {
    const report = await this.findOne(id, userId);

    if (report.status !== ReportStatus.COMPLETED || !report.fileUrl) {
      throw new NotFoundException('Report file not available');
    }

    const filePath = path.join(this.storagePath, report.fileUrl);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Report file not found on disk');
    }

    return {
      stream: fs.createReadStream(filePath),
      filename: report.fileUrl,
    };
  }
}
