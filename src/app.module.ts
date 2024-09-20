import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './modules/posts/posts.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './database/database.module';
import databaseConfig from './config/database.config';
import appConfig from './config/app.config';
import authConfig from './config/auth.config';
import { APP_GUARD } from '@nestjs/core';
import { JWTAuthGuard } from './auth/guards/jwt.guard';
import { AwsModule } from './common/aws/aws.module';
import { EmailModule } from './modules/email/email.module';
import { ApiModule } from './modules/api/api.module';
import { GraphqlModule } from './modules/graphql/graphql.module';
import awsConfig from './config/aws.config';
import { APIGuard } from './auth/guards/api.guard';

@Module({
  imports: [
    // 1- configuration
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: '.env', // ::TODO:: Load different one for testing
      load: [databaseConfig, appConfig, authConfig, awsConfig],
    }),
    // 2- Database
    DatabaseModule,
    AuthModule,
    PostsModule,
    UsersModule,
    AwsModule,
    EmailModule,
    ApiModule,
    GraphqlModule,
  ],
  controllers: [],
  providers: [
    // enable auth globally
    {
      provide: APP_GUARD,
      useClass: JWTAuthGuard, // APIGuard, // JWTAuthGuard, we can add multiple guards
    },
  ],
})
export class AppModule {}
