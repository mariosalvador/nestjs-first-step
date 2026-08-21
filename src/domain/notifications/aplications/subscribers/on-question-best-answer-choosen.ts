import { EventHandler } from "src/core/events/event-handler";
import { AnswerRepository } from "src/domain/forum/application/repositories/answer-repository";
import { SendNotificationUseCase } from "../use-cases/send-notification";
import { DomainEvents } from "src/core/events/domain-events";
import { QuestionBestAnswerChoosenEvent } from "src/domain/forum/events/question-best-answer-choosen-event";
import { Injectable } from "@nestjs/common";


@Injectable()
export class OnQuestionBestAnswerChoosen implements EventHandler {

  constructor(
    private answerRepository: AnswerRepository,
    private sendNotification: SendNotificationUseCase
  ) {
    this.setupSubscriptions();
  }


  setupSubscriptions(): void {
    DomainEvents.register(this.senNewAnswerNotification.bind(this), QuestionBestAnswerChoosenEvent.name)
  }

  private async senNewAnswerNotification({ question, bestAnswerId }: QuestionBestAnswerChoosenEvent) {
    const answer = await this.answerRepository.findById(bestAnswerId.toString());

    if (answer) {
      await this.sendNotification.execute({
        recipientId: answer.authorId.toString(),
        title: `A sua resposta na "${question.title.substring(0, 15).concat('...')}" foi marcada como resposta`,
        content: `O autor da pergunta "${question.title.substring(0, 15).concat('...')}" marcou sua resposta como a melhor resposta`,
      })
    }
  }

}

