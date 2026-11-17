import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppConfig } from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService<AppConfig, true>>(ConfigService);

  app.enableCors({ origin: config.get('corsOrigins', { infer: true }) });

  if (config.get('nodeEnv', { infer: true }) !== 'production') {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Payment Service')
        .setVersion('0.1.0')
        .build(),
    );
    SwaggerModule.setup('swagger', app, document);
  }

  const port = config.get('port', { infer: true });
  await app.listen(port);
  Logger.log(
    `Payment service listening on http://localhost:${port} (Swagger: /swagger)`,
    'Bootstrap',
  );
}

void bootstrap();
