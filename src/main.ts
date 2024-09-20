import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { LoggerInterceptor } from './common/interceptors/log.interceptor';
import { Reflector } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.enableCors();
  const configService = app.get(ConfigService);

  // validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false, // if true this means that any extra propery will be removed automatically and got neglected
    }),
  );
  app.useGlobalInterceptors(
    new LoggerInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );
  // app.useGlobalGuards; // instead of APP_GUARD in main module

  // app.useLogger(new CustomLogger());
  await app.listen(configService.getOrThrow('app.port'));
}
bootstrap();
