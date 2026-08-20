import { QuestionAttachment } from "../../enterprise/entities/questions-attachment"


export abstract class QuestionAttachmentsRepository {
  abstract findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>
  abstract deleteManyByQuestionId(questionId: string): Promise<void>
  abstract deleteMany(attachments: QuestionAttachment[]): Promise<void>
  abstract createMany(attachments: QuestionAttachment[]): Promise<void>
}