import { Injectable } from "@nestjs/common";
import { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import { PrismaService } from "../../prisma.service";
import { QuestionComment } from "@/domain/forum/enterprise/entities/questions-comments";
import { PrismaQuestionCommentssMapper } from "../../mappers/prisma-question-comment-mapper";
import { PaginationParams } from "@/core/repositories/pagination-params";
import { CommentWithAuthor } from "@/domain/forum/enterprise/entities/value-objects/comment-with-author";
import { PrismaCommentWithAuthorMapper } from "../../mappers/prisma-comment-with-author-mapper";

@Injectable()
export class PrismQuestionCommentsRepository implements QuestionCommentsRepository {

  constructor(private prisma: PrismaService) { }

  async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    })

    if (!questionComment) {
      return null;
    }

    return PrismaQuestionCommentssMapper.toDomain(questionComment);
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams): Promise<QuestionComment[]> {
    const questionComments = await this.prisma.comment.findMany({
      where: {
        questionId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return questionComments.map(PrismaQuestionCommentssMapper.toDomain);
  }

  async findManyByQuestionIdWithAuthor(questionId: string, { page }: PaginationParams): Promise<CommentWithAuthor[]> {
    const questionComments = await this.prisma.comment.findMany({
      where: {
        questionId,
      },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return questionComments.map(PrismaCommentWithAuthorMapper.toDomain);
  }

  async create(questionComment: QuestionComment): Promise<void> {
    const data = PrismaQuestionCommentssMapper.toPersist(questionComment);

    await this.prisma.comment.create({
      data,
    });
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        id: questionComment.id.toString(),
      },
    });
  }
}