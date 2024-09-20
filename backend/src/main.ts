import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: configService.get<string>('APP_URL'),
    methods: 'GET,POST,PATCH,DELETE',
    credentials: true,
  });
  await app.listen(5000);
}
bootstrap();
