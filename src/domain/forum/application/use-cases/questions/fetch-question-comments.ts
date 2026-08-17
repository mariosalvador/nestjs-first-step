import { QuestionCommentsRepository } from "../../repositories/question-comments-repository";
import { QuetionsComment } from "@/domain/forum/enterprise/entities/questions-comments";
import { Either, right } from "@/core/either";

interface FetchQuestionCommentsUseCaseInput {
  questionId: string;
  page: number;
}

type FetchQuestionCommentsUseCaseResponse = Either<null, { questionComments: QuetionsComment[] }>;

export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsUseCaseInput): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments = await this.questionCommentsRepository.findManyByQuestionId(questionId, {
      page,
    });

    return right({ questionComments });
  }
}
