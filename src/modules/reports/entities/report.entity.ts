import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ReportType {
  ATTENDANCE_SUMMARY = 'ATTENDANCE_SUMMARY',
  STUDENT_DETAIL = 'STUDENT_DETAIL',
  COURSE_STATISTICS = 'COURSE_STATISTICS',
  COMPARATIVE = 'COMPARATIVE',
}

export enum ReportFormat {
  PDF = 'PDF',
  CSV = 'CSV',
  EXCEL = 'EXCEL',
}

export enum ReportStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ReportType,
  })
  type: ReportType;

  @Column({ name: 'requested_by' })
  requestedBy: string;

  @Column({ type: 'jsonb', nullable: true })
  filters: Record<string, any>;

  @Column({
    type: 'enum',
    enum: ReportFormat,
  })
  format: ReportFormat;

  @Column({
    type: 'enum',
    enum: ReportStatus,
    default: ReportStatus.PENDING,
  })
  status: ReportStatus;

  @Column({ name: 'file_url', nullable: true })
  fileUrl: string;

  @Column({ name: 'error_message', nullable: true, type: 'text' })
  errorMessage: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
