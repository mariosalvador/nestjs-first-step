import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { CreateAccountController } from "../controllers/create-account.controller";
import { AutheticateController } from "../controllers/authenticate.controller";
import { CreateQuestionsController } from "../controllers/create-question.controller";
import { FetchRecentQuestionsController } from "../controllers/fetch-recent-questions.controller";
import { DatabaseModule } from "../database/database.module";
import { CreateQuestionsUseCase } from "@/domain/forum/application/use-cases/questions/create-question";
import { FetchRecentQuestionsUseCase } from "@/domain/forum/application/use-cases/questions/fetch-recent-question";

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [
    CreateAccountController,
    AutheticateController,
    CreateQuestionsController,
    FetchRecentQuestionsController
  ],
  providers: [
    CreateQuestionsUseCase,
    FetchRecentQuestionsUseCase
  ]
})
export class HttpModule { }