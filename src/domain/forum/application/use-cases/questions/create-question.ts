import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionRepository } from "../../repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/questions";
import { Either, left, right } from "@/core/either";
import { QuestionAttachment } from "src/domain/forum/enterprise/entities/questions-attachment";
import { QuestionAttachmentList } from "./question-attachment-list";
import { Injectable } from "@nestjs/common";

interface CreateQuestionsUseCaseInput {
  authorId: string;
  title: string;
  content: string;
  attachmentIds: string[];
}

type CreateQuestionUseCaseResponse = Either<Error, { question: Question }>;

@Injectable()
export class CreateQuestionsUseCase {

  constructor(private QuestionRepository: QuestionRepository) { }

  async execute({
    authorId,
    content,
    title,
    attachmentIds
  }: CreateQuestionsUseCaseInput): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      title,
      content,
      authorId: new UniqueEntityId(authorId),
    });

    const questionWithSameSlug = await this.QuestionRepository.findBySlug(question.slug?.value as string);

    if (questionWithSameSlug) {
      return left(new Error("Question with same title already exists."));
    }

    const questionAttachmentsList = attachmentIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        questionId: question.id,
      });
    });

    question.attachments = new QuestionAttachmentList(questionAttachmentsList);
    await this.QuestionRepository.create(question);
    return right({ question });
  }
}