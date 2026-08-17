import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Question } from "@/domain/forum/enterprise/entities/questions";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";
import { Question as PrismaQuestion } from "generated/prisma/client";


export class PrismQuestionMapper {
  static toDomain(raw: PrismaQuestion): Question {
    return Question.create({
      authorId: new UniqueEntityId(raw.authorId),
      title: raw.title,
      content: raw.content,
      slug: Slug.create(raw.slug),
      bestAnswerId: raw.bestAnswerId ? new UniqueEntityId(raw.bestAnswerId) : null,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    }, new UniqueEntityId(raw.id))
  }
}