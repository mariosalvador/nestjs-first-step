import { QuestionAttachmentsRepository } from "@/domain/forum/application/repositories/questions-attachment-repository";
import { QuestionAttachment } from "@/domain/forum/enterprise/entities/questions-attachment";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismQuestionAttachmentsRepository implements QuestionAttachmentsRepository {

  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]> {
    throw new Error("Method not implemented.");
  }
  deleteManyByQuestionId(questionId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}