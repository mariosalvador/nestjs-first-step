import { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comments";


@Injectable()
export class PrismAnswerCommentsRepository implements AnswerCommentsRepository {
  constructor(private prisma: PrismaService) { }

  async findById(id: string): Promise<AnswerComment | null> {
    throw new Error("Method not implemented.");
  }
  async findManyByAnswerId(answerId: string): Promise<AnswerComment[]> {
    throw new Error("Method not implemented.");
  }
  async create(answerComment: AnswerComment): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async delete(answerComment: AnswerComment): Promise<void> {
    throw new Error("Method not implemented.");
  }
}