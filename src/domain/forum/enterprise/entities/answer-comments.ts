import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";
import { Comment, CommentProps } from "./comments";

export interface AnswerCommentProps extends CommentProps {
  answerId: UniqueEntityId
}

export class AnswerComment extends Comment<AnswerCommentProps> {

  static create(props: Optional<AnswerCommentProps, 'createdAt'>, id?: UniqueEntityId) {
    const answerComment = new AnswerComment({
      ...props,
      createdAt: new Date(),
    }, id);

    return answerComment;
  }
}