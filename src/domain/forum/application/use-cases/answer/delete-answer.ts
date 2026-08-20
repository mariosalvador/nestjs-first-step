import { Answer } from "@/domain/forum/enterprise/entities/answer"
import { AnswerRepository } from "../../repositories/answer-repository"
import { Either, left, right } from "@/core/either"
import { ResourceNotFoundError } from "../errors/resouce-not-found"
import { NotAllowedError } from "../errors/not-allowed-error"
import { Injectable } from "@nestjs/common";

interface DeleteAnswersUseCaseInput {
  answerId: string
  authorId: string
}

type DeleteAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>


@Injectable()
export class DeleteAnswersUseCase {

  constructor(private AnswerRepository: AnswerRepository) { }

  async execute({
    authorId,
    answerId,
  }: DeleteAnswersUseCaseInput): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.AnswerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (answer.authorId?.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.AnswerRepository.delete(answer)
    return right({})
  }
}