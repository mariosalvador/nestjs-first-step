import { AnswerRepository } from "../../repositories/answer-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { Either, right } from "@/core/either";

interface FetchQuestionAnswersUseCaseInput {
  questionId: string;
  page: number
}

type FetchQuestionAnswersUseCaseResponse = Either<null, { answers: Answer[] }>;

export class FetchQuestionAnswersUseCase {

  constructor(private AnswersRepository: AnswerRepository) { }

  async execute({ questionId, page }: FetchQuestionAnswersUseCaseInput): Promise<FetchQuestionAnswersUseCaseResponse> {
    const question = await this.AnswersRepository.findManyAnswersByQuestionId(questionId, {
      page: page,
    })

    return right({ answers: question })
  }
}