import { Module } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";
import { AuthModule } from "./auth/auth.module";
import { CreateAccountController } from "../controllers/create-account.controller";
import { AutheticateController } from "../controllers/authenticate.controller";
import { CreateQuestionsController } from "../controllers/create-question.controller";
import { FetchRecentQuestionsController } from "../controllers/fetch-recent-questions.controller";
import { DatabaseModule } from "../database/database.module";


@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [
    CreateAccountController,
    AutheticateController,
    CreateQuestionsController,
    FetchRecentQuestionsController
  ],
  providers: [PrismaService]
})
export class HttpModule { }