import { Injectable } from "@nestjs/common";
import { AnswerRepository } from "../../repositories/answer-repository";
import { QuestionRepository } from "../../repositories/questions-repository";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "../errors/resouce-not-found";
import { NotAllowedError } from "../errors/not-allowed-error";
import { Question } from "@/domain/forum/enterprise/entities/questions";

interface ChooseTheBestAnswerForQuestionUseCaseInput {
  authorId: string;
  answerId: string;
}

type ChooseTheBestAnswerForQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { question: Question }>;


@Injectable()
export class ChooseTheBestAnswerForQuestionUseCase {

  constructor(
    private questionsRepository: QuestionRepository,
    private answerRepository: AnswerRepository
  ) { }

  async execute({ authorId, answerId }: ChooseTheBestAnswerForQuestionUseCaseInput): Promise<ChooseTheBestAnswerForQuestionUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    const question = await this.questionsRepository.findById(answer.questionId.toString());

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    if (question.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    question.bestAnswerId = answer.id;

    await this.questionsRepository.edit(question);

    return right({
      question
    });
  }
}