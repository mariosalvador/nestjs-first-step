import { Either, left, right } from "@/core/either";
import { AnswerCommentsRepository } from "../../repositories/answer-comments-repository";
import { ResourceNotFoundError } from "../errors/resouce-not-found";
import { NotAllowedError } from "../errors/not-allowed-error";

interface DeleteAnswerCommentUseCaseInput {
  authorId: string;
  answerCommentId: string;
}

type DeleteAnswerCommentUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>;

export class DeleteAnswerCommentUseCase {
  constructor(
    private answerCommentsRepository: AnswerCommentsRepository,
  ) { }

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseInput): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment = await this.answerCommentsRepository.findById(answerCommentId);

    if (!answerComment) {
      return left(new ResourceNotFoundError());
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    await this.answerCommentsRepository.delete(answerComment);

    return right({});
  }
}
