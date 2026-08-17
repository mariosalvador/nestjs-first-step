import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AnswerRepository } from "../../repositories/answer-repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comments";
import { AnswerCommentsRepository } from "../../repositories/answer-comments-repository";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "../errors/resouce-not-found";

interface CommentOnAnswerUseCaseInput {
  authorId: string;
  answerId: string;
  content: string;
}

type CommentOnAnswerUseCaseResponse = Either<ResourceNotFoundError, { answerComment: AnswerComment }>;

export class CommentOnAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private answerCommentsRepository: AnswerCommentsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseInput): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    });

    await this.answerCommentsRepository.create(answerComment);

    return right({ answerComment });
  }
}
