import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { Prisma, Answer as PrismaAnswer } from "generated/prisma/client";


export class PrismaAnswerMapper {

  static toDomain(raw: PrismaAnswer): Answer {
    return Answer.create({
      content: raw.content,
      authorId: new UniqueEntityId(raw.authorId),
      questionId: new UniqueEntityId(raw.questionId),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt as Date
    }, new UniqueEntityId(raw.id))
  }

  static toPersist(answer: Answer): Prisma.AnswerUncheckedCreateInput {
    return {
      id: answer.id.toString(),
      authorId: answer.authorId.toString(),
      questionId: answer.questionId.toString(),
      content: answer.content,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt
    }
  }
}