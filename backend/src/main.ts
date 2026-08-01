import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';

import helmet from 'helmet';
import compression from 'compression';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Gym System API')
    .setDescription('API del sistema de gestión de gimnasio')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(
    app,
    config,
  );

  SwaggerModule.setup(
    'api/docs',
    app,
    document,
  );

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: [
      "http://localhost:3000",
      "http://192.168.0.110:3000",
    ],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use(compression());
  
  app.useGlobalFilters(
    new HttpExceptionFilter(),
  );

  app.use(helmet());

  await app.listen(process.env.PORT ?? 5173, "0.0.0.0");

  console.log(
    `🚀 Backend ejecutándose en http://localhost:${process.env.PORT ?? 5173}/api`,
  );
}

bootstrap();