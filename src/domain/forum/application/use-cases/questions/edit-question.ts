import { QuestionRepository } from "../../repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/questions";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "../errors/resouce-not-found";
import { NotAllowedError } from "../errors/not-allowed-error";
import { QuestionAttachmentsRepository } from "../../repositories/questions-attachment-repository";
import { QuestionAttachmentList } from "./question-attachment-list";
import { QuestionAttachment } from "src/domain/forum/enterprise/entities/questions-attachment";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { Injectable } from "@nestjs/common";

interface EditQuestionsUseCaseInput {
  questionId: string
  authorId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type EditQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { question: Question }>

@Injectable()
export class EditQuestionsUseCase {

  constructor(
    private QuestionRepository: QuestionRepository,
    private questionAttachmentsRepository: QuestionAttachmentsRepository
  ) { }

  async execute({
    authorId,
    questionId,
    title,
    content,
    attachmentsIds
  }: EditQuestionsUseCaseInput): Promise<EditQuestionUseCaseResponse> {
    const question = await this.QuestionRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (question.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    const questionAttachments = await this.questionAttachmentsRepository.findManyByQuestionId(questionId)
    const questionAttachmentsList = new QuestionAttachmentList(questionAttachments)

    const attachments = attachmentsIds.map(attachmentId => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        questionId: question.id,
      })
    })

    questionAttachmentsList.update(attachments)

    question.title = title
    question.content = content
    question.attachments = questionAttachmentsList

    await this.QuestionRepository.edit(question)
    return right({ question })
  }
}