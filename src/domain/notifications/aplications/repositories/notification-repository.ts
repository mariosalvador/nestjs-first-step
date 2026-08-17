import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { Notification } from "../../enterprise/entities/notification";


export interface NotificationsRepository {
  findById(id: UniqueEntityId): Promise<Notification | null>;
  create(notification: Notification): Promise<void>;
}