import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  app.enableCors()
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Bilbioteca API - DigitalNAO')
    .setDescription('API REST para el reto 7 acerca de un gestor para una biblioteca')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);


  await app.listen(3000);
}
bootstrap();
