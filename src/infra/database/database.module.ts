import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismQuestionRepository } from "./prisma/repositories/question/prisma-question-repository";
import { PrismAnswerRepository } from "./prisma/repositories/answer/prisma-anwer-comments-repository";
import { PrismAnswerAttachmentsRepository } from "./prisma/repositories/answer/prisma-answer-attachments-repository";
import { PrismQuestionAttachmentsRepository } from "./prisma/repositories/question/prisma-question-attachments-repository";
import { PrismQuestionCommentsRepository } from "./prisma/repositories/question/prisma-question-comments-repository";
import { PrismAnswerCommentsRepository } from "./prisma/repositories/answer/prisma-answer-repository";


@Module({
  providers: [
    PrismaService,

    PrismQuestionRepository,
    PrismQuestionAttachmentsRepository,
    PrismQuestionCommentsRepository,

    PrismAnswerRepository,
    PrismAnswerCommentsRepository,
    PrismAnswerAttachmentsRepository,
  ],
  exports: [
    PrismaService,

    PrismQuestionRepository,
    PrismQuestionAttachmentsRepository,
    PrismQuestionCommentsRepository,

    PrismAnswerRepository,
    PrismAnswerCommentsRepository,
    PrismAnswerAttachmentsRepository,
  ]
})
export class DatabaseModule { }