import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

export enum AttendanceStatus {
  PRESENTE = 'PRESENTE',
  AUSENTE = 'AUSENTE',
  TARDANZA = 'TARDANZA',
}

@Entity('attendances')
@Index(['studentId', 'classId'])
@Index(['courseId', 'createdAt'])
export class Attendance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'student_id' })
  studentId: string;

  @Column({ name: 'class_id' })
  classId: string;

  @Column({ name: 'course_id' })
  courseId: string;

  @Column({ name: 'arrival_time', type: 'timestamp' })
  arrivalTime: Date;

  @Column({
    type: 'enum',
    enum: AttendanceStatus,
    default: AttendanceStatus.PRESENTE,
  })
  status: AttendanceStatus;

  @Column({ type: 'jsonb', nullable: true })
  coordinates: {
    latitude: number;
    longitude: number;
  };

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
