import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismQuestionRepository } from "./prisma/repositories/question/prisma-question-repository";
import { PrismAnswerRepository } from "./prisma/repositories/answer/prisma-anwer-comments-repository";
import { PrismAnswerAttachmentsRepository } from "./prisma/repositories/answer/prisma-answer-attachments-repository";
import { PrismQuestionAttachmentsRepository } from "./prisma/repositories/question/prisma-question-attachments-repository";
import { PrismQuestionCommentsRepository } from "./prisma/repositories/question/prisma-question-comments-repository";
import { PrismAnswerCommentsRepository } from "./prisma/repositories/answer/prisma-answer-repository";
import { QuestionRepository } from "@/domain/forum/application/repositories/questions-repository";
import { StudentRepository } from "@/domain/forum/application/repositories/student-repository";
import { PrismaStudentRepository } from "./prisma/repositories/students/prisma-students-repositories";

import { QuestionAttachmentsRepository } from "@/domain/forum/application/repositories/questions-attachment-repository";
import { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import { AnswerRepository } from "@/domain/forum/application/repositories/answer-repository";
import { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository";
import { AnswerAttachmentsRepository } from "@/domain/forum/application/repositories/answer-attachments-repository";
import { AttachmentsRepository } from "@/domain/forum/application/repositories/attachments-repository";
import { PrismaAttachmentsRepository } from "./prisma/repositories/attachments/prisma-attachments-repository";
import { NotificationsRepository } from "@/domain/notifications/aplications/repositories/notification-repository";
import { PrismaNotificationRepository } from "./prisma/repositories/notification/prisma-notification-repository";
import { CacheModule } from "@/infra/cache/cache.module";

@Module({
  imports: [
    CacheModule
  ],
  providers: [
    PrismaService,
    {
      provide: QuestionRepository,
      useClass: PrismQuestionRepository
    },
    {
      provide: StudentRepository,
      useClass: PrismaStudentRepository
    },
    {
      provide: QuestionAttachmentsRepository,
      useClass: PrismQuestionAttachmentsRepository
    },
    {
      provide: QuestionCommentsRepository,
      useClass: PrismQuestionCommentsRepository
    },
    {
      provide: AnswerRepository,
      useClass: PrismAnswerRepository
    },
    {
      provide: AnswerCommentsRepository,
      useClass: PrismAnswerCommentsRepository
    },
    {
      provide: AnswerAttachmentsRepository,
      useClass: PrismAnswerAttachmentsRepository
    },
    {
      provide: AttachmentsRepository,
      useClass: PrismaAttachmentsRepository
    },
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationRepository
    }
  ],
  exports: [
    PrismaService,
    StudentRepository,
    QuestionRepository,
    QuestionAttachmentsRepository,
    QuestionCommentsRepository,
    AnswerRepository,
    AnswerCommentsRepository,
    AnswerAttachmentsRepository,
    AttachmentsRepository,
    NotificationsRepository,
  ]
})
export class DatabaseModule { }