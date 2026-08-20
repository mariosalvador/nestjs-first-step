import { Question as PrismaQuestion, User as PrismaUser, Attachment as PrismaAttachment } from "generated/prisma/client";
import { QuestionDetails } from "@/domain/forum/enterprise/entities/value-objects/question-details";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { PrismaAttachmentMapper } from "./prisma-attachment-mapper";

type PrismaQuestionDetails = PrismaQuestion & {
  author: PrismaUser;
  attachments: PrismaAttachment[];
};

export class PrismaQuestionDetailsMapper {
  static toDomain(raw: PrismaQuestionDetails): QuestionDetails {
    return QuestionDetails.create({
      questionId: new UniqueEntityId(raw.id),
      authorId: new UniqueEntityId(raw.authorId),
      author: raw.author.name,
      slug: raw.slug,
      title: raw.title,
      content: raw.content,
      bestAnswerId: raw.bestAnswerId ? new UniqueEntityId(raw.bestAnswerId) : null,
      attachments: raw.attachments.map(PrismaAttachmentMapper.toDomain),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt ?? undefined,
    });
  }
}
