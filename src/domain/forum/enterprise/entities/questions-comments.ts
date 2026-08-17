
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { Comment, CommentProps } from "./comments";
import { Optional } from "@/core/types/optional";

export interface QuetionsCommentProps extends CommentProps {
  questionId: UniqueEntityId
}

export class QuetionsComment extends Comment<QuetionsCommentProps> {

  static create(props: Optional<QuetionsCommentProps, 'createdAt'>, id?: UniqueEntityId) {
    const quetionsComment = new QuetionsComment({
      ...props,
      createdAt: new Date(),
    }, id);

    return quetionsComment;
  }
}