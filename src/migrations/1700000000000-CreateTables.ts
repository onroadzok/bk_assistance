import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1700000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE report_type AS ENUM ('ATTENDANCE_SUMMARY', 'STUDENT_DETAIL', 'COURSE_STATISTICS', 'COMPARATIVE');
      CREATE TYPE report_format AS ENUM ('PDF', 'CSV', 'EXCEL');
      CREATE TYPE report_status AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');
      CREATE TYPE attendance_status AS ENUM ('PRESENTE', 'AUSENTE', 'TARDANZA');

      CREATE TABLE reports (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        type report_type NOT NULL,
        requested_by VARCHAR NOT NULL,
        filters JSONB,
        format report_format NOT NULL,
        status report_status DEFAULT 'PENDING',
        file_url VARCHAR,
        error_message TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE attendances (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        student_id VARCHAR NOT NULL,
        class_id VARCHAR NOT NULL,
        course_id VARCHAR NOT NULL,
        arrival_time TIMESTAMP NOT NULL,
        status attendance_status DEFAULT 'PRESENTE',
        coordinates JSONB,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE INDEX idx_attendance_student_class ON attendances(student_id, class_id);
      CREATE INDEX idx_attendance_course_date ON attendances(course_id, created_at);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE attendances;
      DROP TABLE reports;
      DROP TYPE attendance_status;
      DROP TYPE report_status;
      DROP TYPE report_format;
      DROP TYPE report_type;
    `);
  }
}
