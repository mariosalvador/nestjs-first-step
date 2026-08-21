import { NotificationsRepository } from "@/domain/notifications/aplications/repositories/notification-repository";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Notification } from "@/domain/notifications/enterprise/entities/notification";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { PrismaNotificationMapper } from "../../mappers/prisma-notification-mapper";


@Injectable()
export class PrismaNotificationRepository implements NotificationsRepository {

  constructor(private prisma: PrismaService) { }

  async findById(id: UniqueEntityId): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id: id.toString(),
      },
    });

    if (!notification) {
      return null;
    }

    return PrismaNotificationMapper.toDomain(notification);
  }

  async create(notification: Notification): Promise<void> {
    await this.prisma.notification.create({
      data: PrismaNotificationMapper.toPrisma(notification),
    });
  }

}

