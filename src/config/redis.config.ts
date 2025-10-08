import { ConfigService } from '@nestjs/config';
import { CacheModuleOptions } from '@nestjs/cache-manager';
import redisStore from 'cache-manager-redis-store';

export const getRedisConfig = (
  configService: ConfigService,
): CacheModuleOptions => ({
  store: redisStore as any,
  host: configService.get<string>('REDIS_HOST'),
  port: parseInt(configService.get<string>('REDIS_PORT', '6379')),
  password: configService.get<string>('REDIS_PASSWORD') || undefined,
  ttl: parseInt(configService.get<string>('REDIS_TTL', '3600')),
  max: 100,
});
