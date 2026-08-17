import { DomainEvent } from "src/core/events/domain-event";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { Question } from "../enterprise/entities/questions";

export class QuestionBestAnswerChoosenEvent implements DomainEvent {
  public ocurredAt: Date;
  public question: Question;
  public bestAnswerId: UniqueEntityId;

  constructor(question: Question, bestAnswerId: UniqueEntityId) {
    this.question = question;
    this.bestAnswerId = bestAnswerId;
    this.ocurredAt = new Date();
  }

  public getAggregateId(): UniqueEntityId {
    return this.question.id;
  }
}