import { Answer } from "@/domain/forum/enterprise/entities/answer"
import { AnswerRepository } from "../../repositories/answer-repository"
import { Either, left, right } from "@/core/either"
import { ResourceNotFoundError } from "../errors/resouce-not-found"
import { NotAllowedError } from "../errors/not-allowed-error"
import { AnswerAttachmentsRepository } from "../../repositories/answer-attachments-repository"
import { AnswerAttachmentList } from "@/domain/forum/enterprise/entities/answer-attachment-list"
import { AnswerAttachment } from "@/domain/forum/enterprise/entities/answer-attachment"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { Injectable } from "@nestjs/common";

interface EditAnswersUseCaseInput {
  answerId: string
  authorId: string
  content: string
  attachmentsIds: string[]
}

type EditAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { answer: Answer }>


@Injectable()
export class EditAnswersUseCase {

  constructor(
    private AnswerRepository: AnswerRepository,
    private answerAttachmentsRepository: AnswerAttachmentsRepository
  ) { }

  async execute({
    authorId,
    answerId,
    content,
    attachmentsIds
  }: EditAnswersUseCaseInput): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.AnswerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (answer.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    const currentAnswerAttachments = await this.answerAttachmentsRepository.findManyByAnswerId(answerId)
    const answerAttachmentList = new AnswerAttachmentList(currentAnswerAttachments)

    const answerAttachments = attachmentsIds.map(attachmentId => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        answerId: answer.id,
      })
    })

    answerAttachmentList.update(answerAttachments)

    answer.content = content
    answer.attachments = answerAttachmentList

    await this.AnswerRepository.edit(answer)
    return right({ answer })
  }
}