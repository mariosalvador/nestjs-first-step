import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { AnswerAttachmentsRepository } from "@/domain/forum/application/repositories/answer-attachments-repository";
import { AnswerAttachment } from "@/domain/forum/enterprise/entities/answer-attachment";


@Injectable()
export class PrismAnswerAttachmentsRepository implements AnswerAttachmentsRepository {
  constructor(private prisma: PrismaService) { }

  async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    throw new Error("Method not implemented.");
  }

  async deleteManyByAnswerId(answerId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}