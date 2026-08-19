import { Entity } from "src/core/entities/entity";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";


export interface CommentProps {
  answerId: UniqueEntityId
  authorId: UniqueEntityId
  content: string
  createdAt: Date
  updatedAt?: Date
}

export abstract class Comment<T extends CommentProps> extends Entity<T> {

  private touch() {
    this.props.updatedAt = new Date();
  }
  get content() {
    return this.props.content;
  }
  get answerId() {
    return this.props.answerId;
  }
  get authorId() {
    return this.props.authorId;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }


  // Setters
  set content(content: string) {
    this.props.content = content;
    this.touch();
  }
}