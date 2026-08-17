import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionRepository } from "@/domain/forum/application/repositories/questions-repository";
import { PrismaService } from "../../prisma.service";
import { Question } from "@/domain/forum/enterprise/entities/questions";
import { Injectable } from "@nestjs/common";
import { PrismQuestionMapper } from "../../mappers/prisma-question-mappers";


@Injectable()
export class PrismQuestionRepository implements QuestionRepository {

  constructor(private prisma: PrismaService) { }

  async findById(id: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        id,
      },
    })

    if (!question) return null;

    return PrismQuestionMapper.toDomain(question);
  }
  async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    throw new Error("Method not implemented.");
  }
  async create(question: Question): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async delete(question: Question): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async edit(question: Question): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findBySlug(slug: string): Promise<Question | null> {
    throw new Error("Method not implemented.");
  }
}