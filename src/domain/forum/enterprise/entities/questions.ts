import { Slug } from "./value-objects/slug";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";
import { AggregateRoot } from "src/core/entities/aggregate-root";
import { QuestionAttachmentList } from "../../application/use-cases/questions/question-attachment-list";
import { QuestionBestAnswerChoosenEvent } from "../../events/question-best-answer-choosen-event";

interface QuestionProps {
  slug?: Slug;
  title: string;
  content: string;
  authorId: UniqueEntityId;
  bestAnswerId?: UniqueEntityId | null;
  attachments: QuestionAttachmentList;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Question extends AggregateRoot<QuestionProps> {

  // Setters
  private touch() {
    this.props.updatedAt = new Date();
  }

  // Getters
  get slug() {
    return this.props.slug;
  }
  get title() {
    return this.props.title;
  }
  get content() {
    return this.props.content;
  }
  get authorId() {
    return this.props.authorId;
  }
  get bestAnswerId() {
    return this.props.bestAnswerId;
  }
  get attachments() {
    return this.props.attachments;
  }

  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...');
  }

  // Setters

  set title(title: string) {
    this.props.title = title;
    this.props.slug = Slug.createFromText(title);
    this.touch();
  }

  set content(content: string) {
    this.props.content = content;
    this.touch();
  }

  set bestAnswerId(bestAnswerId: UniqueEntityId | undefined | null) {

    if (bestAnswerId === undefined || bestAnswerId === null) return;

    if (!this.props.bestAnswerId || !this.props.bestAnswerId.equals(bestAnswerId)) {
      this.addDomainEvent(new QuestionBestAnswerChoosenEvent(this, bestAnswerId));
    }

    this.props.bestAnswerId = bestAnswerId;
    this.touch();
  }

  set attachments(attachments: QuestionAttachmentList) {
    this.props.attachments = attachments;
    this.touch();
  }

  static create(props: Optional<QuestionProps, 'createdAt' | "slug" | "attachments" | "bestAnswerId">, id?: UniqueEntityId) {
    const question = new Question({
      ...props,
      slug: props.slug ?? Slug.createFromText(props.title),
      createdAt: new Date(),
      attachments: props.attachments ?? new QuestionAttachmentList(),
    }, id);

    return question;
  }
}