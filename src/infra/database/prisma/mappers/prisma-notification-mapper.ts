import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Prisma, Notification as PrismaNotification } from "generated/prisma/client";
import { Notification } from "src/domain/notifications/enterprise/entities/notification";

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification): Prisma.NotificationUncheckedCreateInput {
    return {
      id: notification.id.toString(),
      title: notification.title,
      content: notification.content,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
      recipientId: notification.recipientId.toString(),
    };
  }

  static toDomain(raw: PrismaNotification): Notification {
    return Notification.create({
      id: raw.id,
      title: raw.title,
      content: raw.content,
      readAt: raw.readAt ?? undefined,
      createdAt: raw.createdAt,
      recipientId: new UniqueEntityId(raw.recipientId),
    }, new UniqueEntityId(raw.id));
  }
}