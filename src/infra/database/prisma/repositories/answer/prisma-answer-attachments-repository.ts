import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { AnswerAttachmentsRepository } from "@/domain/forum/application/repositories/answer-attachments-repository";
import { AnswerAttachment } from "@/domain/forum/enterprise/entities/answer-attachment";
import { PrismaAnswerAttachmentMapper } from "../../mappers/prisma-answer-attachments-mapper";

@Injectable()
export class PrismAnswerAttachmentsRepository implements AnswerAttachmentsRepository {
  constructor(private prisma: PrismaService) { }

  async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    const answerAttachments = await this.prisma.attachment.findMany({
      where: {
        answerId,
      },
    });

    return answerAttachments.map(PrismaAnswerAttachmentMapper.toDomain);
  }

  async deleteManyByAnswerId(answerId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: {
        answerId,
      },
    });
  }

  async createMany(attachments: AnswerAttachment[]): Promise<void> {
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
        answerId: attachments[0].answerId.toString(),
      }
    })
  }

  async deleteMany(attachments: AnswerAttachment[]): Promise<void> {
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