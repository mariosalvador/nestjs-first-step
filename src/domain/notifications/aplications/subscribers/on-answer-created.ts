import { DomainEvents } from "src/core/events/domain-events";
import { EventHandler } from "src/core/events/event-handler";
import { QuestionRepository } from "src/domain/forum/application/repositories/questions-repository";
import { AnswerCreatedEvent } from "src/domain/forum/events/answer-created-event";
import { SendNotificationUseCase } from "../use-cases/send-notification";


export class OnAnswerCreated implements EventHandler {
  constructor(
    private questionsRepository: QuestionRepository,
    private sendNotification: SendNotificationUseCase
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.senNewAnswerNotification.bind(this), AnswerCreatedEvent.name)
  }

  private async senNewAnswerNotification({ answer }: AnswerCreatedEvent) {
    const question = await this.questionsRepository.findById(answer.questionId.toString());

    if (question) {
      await this.sendNotification.execute({
        recipientId: question.authorId.toString(),
        title: `Nova resposta em "${question.title.substring(0, 40).concat('...')}"`,
        content: answer.excerpt,
      })
    }
  }
}