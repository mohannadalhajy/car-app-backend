import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';
import * as cors from 'cors';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors())
  app.use('/public', express.static(path.join(__dirname, '..', 'images')));
  await app.listen(3001);
}
bootstrap();
