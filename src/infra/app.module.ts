import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './http/prisma/prisma.service';
import { CreateAccountController } from './controllers/create-account.controller';
import { AutheticateController } from './controllers/authenticate.controller';
import { AuthModule } from './http/auth/auth.module';
import { CreateQuestionsController } from './controllers/create-question.controller';
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller';
import { envSchema } from '@/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [
    CreateAccountController,
    AutheticateController,
    CreateQuestionsController,
    FetchRecentQuestionsController
  ],
  providers: [PrismaService],
})
export class AppModule { }