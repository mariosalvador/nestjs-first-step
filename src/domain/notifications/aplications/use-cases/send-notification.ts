import { Either, right } from "src/core/either";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { Notification } from "../../enterprise/entities/notification";
import { NotificationsRepository } from "../repositories/notification-repository";
import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";


interface SendNotificationUseCaseRequest {
  recipientId: string;
  title: string;
  content: string;
}

type SendNotificationUseCaseResponse = Either<null, {
  notification: Notification;
}>;

@Injectable()
export class SendNotificationUseCase {
  constructor(
    private notificationsRepository: NotificationsRepository
  ) { }

  async execute({ recipientId, title, content }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
    const notification = Notification.create({
      id: randomUUID(),
      recipientId: new UniqueEntityId(recipientId),
      content,
      title,
    });

    await this.notificationsRepository.create(notification);

    return right({ notification });
  }
}