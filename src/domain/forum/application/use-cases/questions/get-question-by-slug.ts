import { QuestionRepository } from "../../repositories/questions-repository";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "../errors/resouce-not-found";
import { Injectable } from "@nestjs/common";
import { QuestionDetails } from "@/domain/forum/enterprise/entities/value-objects/question-details";

interface GetQuestionsBySlugUseCaseInput {
  slug: string
}

type GetQuestionsBySlugUseCaseResponse = Either<ResourceNotFoundError, { question: QuestionDetails }>


@Injectable()
export class GetQuestionsBySlugUseCase {

  constructor(private QuestionRepository: QuestionRepository) { }

  async execute({
    slug
  }: GetQuestionsBySlugUseCaseInput): Promise<GetQuestionsBySlugUseCaseResponse> {
    const question = await this.QuestionRepository.findDetailsBySlug(slug)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    return right({ question })
  }
}