import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance, AttendanceStatus } from '../attendance/entities/attendance.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(Attendance)
    private attendanceRepo: Repository<Attendance>,
  ) {}

  async getDashboard() {
    const cached = await this.cacheManager.get('stats:global');
    if (cached) return cached;

    const total = await this.attendanceRepo.count();
    const presentes = await this.attendanceRepo.count({ where: { status: AttendanceStatus.PRESENTE } });
    const ausentes = await this.attendanceRepo.count({ where: { status: AttendanceStatus.AUSENTE } });
    const tardanzas = await this.attendanceRepo.count({ where: { status: AttendanceStatus.TARDANZA } });

    const stats = { total, presentes, ausentes, tardanzas, porcentajeAsistencia: (presentes / total) * 100 };
    await this.cacheManager.set('stats:global', stats, 300);
    return stats;
  }

  async getCourseStats(courseId: string) {
    const cacheKey = `stats:course:${courseId}`;
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) return cached;

    const total = await this.attendanceRepo.count({ where: { courseId } });
    const presentes = await this.attendanceRepo.count({ where: { courseId, status: AttendanceStatus.PRESENTE } });

    const stats = { courseId, total, presentes, porcentajeAsistencia: total ? (presentes / total) * 100 : 0 };
    await this.cacheManager.set(cacheKey, stats, 300);
    return stats;
  }

  async updateStatsCache(attendance: any) {
    await this.cacheManager.del('stats:global');
    await this.cacheManager.del(`stats:course:${attendance.courseId}`);
  }
}
