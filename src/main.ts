import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { winstonLogger } from './common/logger/winston.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: winstonLogger });

  // rabit 
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [process.env.RABBITMQ_URL],
  //     queue: 'reports_queue',
  //     queueOptions: { durable: true },
  //   },
  // });

  app.enableCors({ origin: process.env.FRONTEND_URL || '*' });
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());

  const config = new DocumentBuilder()
    .setTitle('AssitClass - Reportes API')
    .setDescription('Microservicio de generación de reportes y analytics')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // await app.startAllMicroservices(); // Comentado - requiere RabbitMQ
  await app.listen(process.env.PORT || 3002);
  console.log(`🚀 Reports service running on port ${process.env.PORT || 3002}`);
}
bootstrap();
