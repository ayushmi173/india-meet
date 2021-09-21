import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const service = app.get<ConfigService>(ConfigService);

  const port: number = service.get('BACKEND_PORT');
  await app.listen(port);
  Logger.log(`Backend is running on ${port}`);
}
bootstrap();
