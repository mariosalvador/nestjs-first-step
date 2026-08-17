import { Either, left, right } from "src/core/either";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { Notification } from "../../enterprise/entities/notification";
import { NotificationsRepository } from "../repositories/notification-repository";
import { ResourceNotFoundError } from "src/domain/forum/application/use-cases/errors/resouce-not-found";
import { NotAllowedError } from "src/domain/forum/application/use-cases/errors/not-allowed-error";


interface ReadNotificationUseCaseRequest {
  recipientId: string;
  notificationId: string;
}

type ReadNotificationUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {
  notification: Notification;
}>;

export class ReadNotificationUseCase {
  constructor(
    private notificationsRepository: NotificationsRepository
  ) { }

  async execute({ recipientId, notificationId }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification = await this.notificationsRepository.findById(new UniqueEntityId(notificationId))

    if (!notification) {
      return left(new ResourceNotFoundError());
    }

    if (notification.recipientId !== recipientId.toString()) {
      return left(new NotAllowedError());
    }

    notification.read();
    await this.notificationsRepository.create(notification);

    return right({ notification });
  }
}