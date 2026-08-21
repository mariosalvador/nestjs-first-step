

import { Module } from "@nestjs/common";
import { OnAnswerCreated } from "src/domain/notifications/aplications/subscribers/on-answer-created";
import { OnQuestionBestAnswerChoosen } from "src/domain/notifications/aplications/subscribers/on-question-best-answer-choosen";
import { SendNotificationUseCase } from "src/domain/notifications/aplications/use-cases/send-notification";
import { DatabaseModule } from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  providers: [
    OnAnswerCreated,
    OnQuestionBestAnswerChoosen,
    SendNotificationUseCase,
  ],
})
export class EventsModule { }