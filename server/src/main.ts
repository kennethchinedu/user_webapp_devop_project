import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './utils/global-exception.filter';
import {
  BadRequestException,
  ValidationPipe,
  ValidationError,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('User dashboard')
    .setDescription('The user dashboard API documentation')
    .setVersion('1.0')
    .addTag('User dashboard')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new GlobalExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        const flattenErrors = (
          validationErrors: ValidationError[],
        ): string[] => {
          const result = [];
          for (const error of validationErrors) {
            if (error.constraints) {
              result.push(...Object.values(error.constraints));
            }
            if (error.children && error.children.length > 0) {
              result.push(...flattenErrors(error.children));
            }
          }
          return result;
        };

        const messages = flattenErrors(errors);

        const errorMessage = messages.join(', ');

        return new BadRequestException({
          message: errorMessage || 'Validation failed',
        });
      },
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const allowedOrigins = [
    '*',
    'http://localhost:3000',
    'https://user-dashboard-rouge.vercel.app',
  ];
  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  await app.listen(4000);
}
bootstrap();
