import { QuestionRepository } from "../../repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/questions";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "../errors/resouce-not-found";
import { NotAllowedError } from "../errors/not-allowed-error";

interface DeleteQuestionsUseCaseInput {
  questionId: string
  authorId: string
}

type DeleteQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>;

export class DeleteQuestionsUseCase {

  constructor(private QuestionRepository: QuestionRepository) { }

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionsUseCaseInput): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.QuestionRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (question.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.QuestionRepository.delete(question)
    return right({})
  }
}