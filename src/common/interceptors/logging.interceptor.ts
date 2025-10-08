import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, headers } = request;
    const correlationId = headers['x-correlation-id'] || uuidv4();
    const startTime = Date.now();

    request.headers['x-correlation-id'] = correlationId;

    this.logger.log(
      `[${correlationId}] --> ${method} ${url} | User: ${request.user?.userId || 'anonymous'}`,
    );

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = Date.now() - startTime;
          this.logger.log(
            `[${correlationId}] <-- ${method} ${url} ${context.switchToHttp().getResponse().statusCode} | ${duration}ms`,
          );
        },
        error: (error) => {
          const duration = Date.now() - startTime;
          this.logger.error(
            `[${correlationId}] <-- ${method} ${url} ERROR | ${duration}ms`,
            error.stack,
          );
        },
      }),
    );
  }
}
