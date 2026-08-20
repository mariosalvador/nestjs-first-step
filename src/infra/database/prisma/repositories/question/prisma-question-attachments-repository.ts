import { QuestionAttachmentsRepository } from "@/domain/forum/application/repositories/questions-attachment-repository";
import { QuestionAttachment } from "@/domain/forum/enterprise/entities/questions-attachment";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { PrismaQuestionAttachmentMapper } from "../../mappers/prisma-question-attachments-mapper";

@Injectable()
export class PrismQuestionAttachmentsRepository implements QuestionAttachmentsRepository {
  constructor(private prisma: PrismaService) { }

  async findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]> {
    const questionAttachments = await this.prisma.attachment.findMany({
      where: {
        questionId,
      }
    })

    return questionAttachments.map(PrismaQuestionAttachmentMapper.toDomain);
  }

  async deleteManyByQuestionId(questionId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: {
        questionId,
      }
    })
  }

  async createMany(attachments: QuestionAttachment[]): Promise<void> {
    if (attachments.length === 0) {
      return;
    }
    const attachmentIds = attachments.map(attachment => attachment.attachmentId.toString());
    await this.prisma.attachment.updateMany({
      where: {
        id: {
          in: attachmentIds,
        }
      },
      data: {
        questionId: attachments[0].questionId.toString(),
      }
    })
  }

  async deleteMany(attachments: QuestionAttachment[]): Promise<void> {
    if (attachments.length === 0) {
      return;
    }

    const attachmentIds = attachments.map(attachment => attachment.id.toString());
    await this.prisma.attachment.deleteMany({
      where: {
        id: {
          in: attachmentIds,
        }
      }
    })
  }
}