import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { ValueObject } from "@/core/entities/value-objects";
import { Attachment } from "../attachment";

export class QuestionDetailsProps {
  questionId: UniqueEntityId;
  authorId: UniqueEntityId;
  author: string;
  slug: string;
  title: string;
  content: string;
  attachments: Attachment[];
  bestAnswerId?: UniqueEntityId | null;
  createdAt: Date;
  updatedAt?: Date;
}

export class QuestionDetails extends ValueObject<QuestionDetailsProps> {
  get questionId() {
    return this.props.questionId;
  }
  get authorId() {
    return this.props.authorId;
  }
  get author() {
    return this.props.author;
  }
  get slug() {
    return this.props.slug;
  }
  get title() {
    return this.props.title;
  }
  get content() {
    return this.props.content;
  }
  get attachments() {
    return this.props.attachments;
  }
  get bestAnswerId() {
    return this.props.bestAnswerId;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(props: QuestionDetailsProps) {
    return new QuestionDetails(props);
  }
}