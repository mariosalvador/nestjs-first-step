import { UniqueEntityId } from "../../../../../core/entities/unique-entity-id";
import { Answer } from "../../../enterprise/entities/answer";
import { AnswerRepository } from "../../repositories/answer-repository";
import { Either, right } from "@/core/either";
import { AnswerAttachment } from "../../../enterprise/entities/answer-attachment";
import { AnswerAttachmentList } from "../../../enterprise/entities/answer-attachment-list";

interface AnswerQuestionsUseCaseInput {
  instrutorId: string;
  questionId: string;
  content: string;
  attachmentsIds: string[];
}

type AnswerQuestionsUseCaseResponse = Either<null, { answer: Answer }>;

export class AnswerQuestionsUseCase {

  constructor(private answerRepository: AnswerRepository) { }

  async execute({ instrutorId, questionId, content, attachmentsIds }: AnswerQuestionsUseCaseInput): Promise<AnswerQuestionsUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instrutorId),
      questionId: new UniqueEntityId(questionId),
    });

    const answerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        answerId: answer.id,
      });
    });

    answer.attachments = new AnswerAttachmentList(answerAttachments);

    await this.answerRepository.create(answer);
    return right({ answer });
  }
}