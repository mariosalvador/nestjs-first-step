import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Attachment } from "@/domain/forum/enterprise/entities/attachment";
import { Prisma, Attachment as PrismaAttachment } from "generated/prisma/client";

export class PrismaAttachmentMapper {
  static toDomain(raw: PrismaAttachment): Attachment {
    return Attachment.create({
      title: raw.title,
      link: raw.url,
      parentId: raw.questionId ?? raw.answerId ?? undefined,
      parentType: raw.questionId ? "QUESTION" : raw.answerId ? "ANSWER" : undefined
    }, new UniqueEntityId(raw.id))
  }

  static toPersist(attachment: Attachment): Prisma.AttachmentUncheckedCreateInput {
    return {
      id: attachment.id.toString(),
      title: attachment.title,
      url: attachment.link,
    }
  }
}
