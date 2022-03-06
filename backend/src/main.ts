import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get<number>('PORT');

  const DocBuilder = new DocumentBuilder()
    .setTitle(config.get<string>('APP_NAME'))
    .setDescription(config.get<string>('APP_DESCRIPTION'))
    .setVersion(config.get<string>('APP_VERSION'))
    .build();
  const document = SwaggerModule.createDocument(app, DocBuilder);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();