import { AnswerRepository } from "@/domain/forum/application/repositories/answer-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";



@Injectable()
export class PrismAnswerRepository implements AnswerRepository {
  constructor(private prisma: PrismaService) { }

  async create(answer: Answer): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async delete(answer: Answer): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async findById(id: string): Promise<Answer | null> {
    throw new Error("Method not implemented.");
  }
  async edit(answer: Answer): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async findManyAnswersByQuestionId(questionId: string): Promise<Answer[]> {
    throw new Error("Method not implemented.");
  }
}