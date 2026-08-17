import { QuestionRepository } from "../../repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/questions";
import { Either, right } from "@/core/either";

interface FetchRecentQuestionsUseCaseInput {
  page: number
}

type FetchRecentQuestionsUseCaseResponse = Either<null, { questions: Question[] }>;

export class FetchRecentQuestionsUseCase {

  constructor(private QuestionRepository: QuestionRepository) { }

  async execute({ page }: FetchRecentQuestionsUseCaseInput): Promise<FetchRecentQuestionsUseCaseResponse> {
    const question = await this.QuestionRepository.findManyRecent({
      page: page,
    })

    return right({ questions: question })
  }
}