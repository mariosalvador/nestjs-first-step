import { Injectable } from "@nestjs/common";
import { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import { PrismaService } from "../../prisma.service";
import { QuestionComment } from "@/domain/forum/enterprise/entities/questions-comments";


@Injectable()
export class PrismQuestionCommentsRepository implements QuestionCommentsRepository {

  constructor(private prisma: PrismaService) { }

  async findById(id: string): Promise<QuestionComment | null> {
    throw new Error("Method not implemented.");
  }
  async findManyByQuestionId(questionId: string): Promise<QuestionComment[]> {
    throw new Error("Method not implemented.");
  }
  async create(questionComment: QuestionComment): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async delete(questionComment: QuestionComment): Promise<void> {
    throw new Error("Method not implemented.");
  }
}