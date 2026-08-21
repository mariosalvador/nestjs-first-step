import { Entity } from "src/core/entities/entity";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { Optional } from "src/core/types/optional";

interface NotificationProps {
  id: string;
  title: string;
  content: string;
  recipientId: UniqueEntityId;
  readAt?: Date;
  createdAt: Date;
}

export class Notification extends Entity<NotificationProps> {

  get recipientId(): string {
    return this.props.recipientId.toString();
  }

  get title(): string {
    return this.props.title;
  }

  get content(): string {
    return this.props.content;
  }

  get readAt(): Date | undefined {
    return this.props.readAt;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  read() {
    this.props.readAt = new Date();
  }

  static create(props: Optional<NotificationProps, 'createdAt'>, id?: UniqueEntityId) {
    const notification = new Notification({
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }, id);

    return notification;
  }
}