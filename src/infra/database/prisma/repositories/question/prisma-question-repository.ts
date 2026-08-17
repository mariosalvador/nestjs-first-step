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
  async findBySlug(slug: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        slug,
      },
    })

    if (!question) return null;

    return PrismQuestionMapper.toDomain(question);
  }

  async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    const questions = await this.prisma.question.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })
    return questions.map(PrismQuestionMapper.toDomain)
  }

  async create(question: Question): Promise<void> {
    const data = PrismQuestionMapper.toPersitence(question);
    await this.prisma.question.create({
      data,
    })
  }
  async delete(question: Question): Promise<void> {
    const data = PrismQuestionMapper.toPersitence(question);
    await this.prisma.question.delete({
      where: {
        id: data.id,
      },
    })
  }

  async edit(question: Question): Promise<void> {
    const data = PrismQuestionMapper.toPersitence(question);
    await this.prisma.question.update({
      where: {
        id: question.id.toString(),
      },
      data,
    })
  }

}