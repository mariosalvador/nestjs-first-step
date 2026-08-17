import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionRepository } from "../../repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/questions";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "../errors/resouce-not-found";

interface GetQuestionsBySlugUseCaseInput {
  slug: string
}

type GetQuestionsBySlugUseCaseResponse = Either<ResourceNotFoundError, { question: Question }>

export class GetQuestionsBySlugUseCase {

  constructor(private QuestionRepository: QuestionRepository) { }

  async execute({
    slug
  }: GetQuestionsBySlugUseCaseInput): Promise<GetQuestionsBySlugUseCaseResponse> {
    const question = await this.QuestionRepository.findBySlug(slug)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    return right({ question })
  }
}