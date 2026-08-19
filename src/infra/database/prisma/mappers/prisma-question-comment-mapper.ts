import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionComment } from "@/domain/forum/enterprise/entities/questions-comments";
import { Prisma, Comment as PrismaComment } from "generated/prisma/client";


export class PrismaQuestionCommentssMapper {

  static toDomain(raw: PrismaComment): QuestionComment {

    if (!raw.questionId) {
      throw new Error('Invalid comment type.');
    }

    return QuestionComment.create({
      questionId: new UniqueEntityId(raw.questionId),
      content: raw.content,
      authorId: new UniqueEntityId(raw.authorId),
      answerId: new UniqueEntityId(raw.answerId as string),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt as Date,
    }, new UniqueEntityId(raw.id))
  }

  static toPersist(questionComments: QuestionComment): Prisma.CommentUncheckedCreateInput {
    return {
      id: questionComments.id.toString(),
      authorId: questionComments.authorId.toString(),
      answerId: questionComments.answerId.toString(),
      content: questionComments.content,
      createdAt: questionComments.createdAt,
      updatedAt: questionComments.updatedAt
    }
  }
}