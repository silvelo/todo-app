import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});

  app.setGlobalPrefix("api/");

  const config = new DocumentBuilder()
    .setTitle('Notes')
    .setDescription('Notes operations')
    .setVersion('1.0')
    .addTag('notes')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  const port = process.env.PORT ?? 3000; // Obtener el puerto

  await app.listen(port);

  const logger = new Logger('Bootstrap'); // Nombre del contexto
  logger.log(`Application is running on: http://localhost:${port}/api`);
}
bootstrap();
