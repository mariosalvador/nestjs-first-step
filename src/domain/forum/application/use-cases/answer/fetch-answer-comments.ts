import { AnswerCommentsRepository } from "../../repositories/answer-comments-repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comments";
import { Either, right } from "@/core/either";

interface FetchAnswerCommentsUseCaseInput {
  answerId: string;
  page: number;
}

type FetchAnswerCommentsUseCaseResponse = Either<null, { answerComments: AnswerComment[] }>;

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentsUseCaseInput): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answerComments = await this.answerCommentsRepository.findManyByAnswerId(answerId, {
      page,
    });

    return right({ answerComments });
  }
}
