import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { Notification } from "../../enterprise/entities/notification";


export abstract class NotificationsRepository {
  abstract findById(id: UniqueEntityId): Promise<Notification | null>;
  abstract create(notification: Notification): Promise<void>;
}