import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionRepository } from "../../repositories/questions-repository";
import { QuetionsComment } from "@/domain/forum/enterprise/entities/questions-comments";
import { QuestionCommentsRepository } from "../../repositories/question-comments-repository";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "../errors/resouce-not-found";

interface CommentOnQuestionUseCaseInput {
  authorId: string;
  questionId: string;
  content: string;
}

type CommentOnQuestionUseCaseResponse = Either<ResourceNotFoundError, { questionComment: QuetionsComment }>;

export class CommentOnQuestionUseCase {
  constructor(
    private questionRepository: QuestionRepository,
    private questionCommentsRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseInput): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    const questionComment = QuetionsComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    });

    await this.questionCommentsRepository.create(questionComment);

    return right({ questionComment });
  }
}
