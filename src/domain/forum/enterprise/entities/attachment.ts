import { Entity } from "src/core/entities/entity";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";


interface AttachmentProps {
  title: String;
  link: string;
  parentId: string;
  parentType: "QUESTION" | "ANSWER";
}



export class Attachment extends Entity<AttachmentProps> {

  get title() {
    return this.props.title
  }

  get link() {
    return this.props.link
  }

  static create(props: AttachmentProps, id?: UniqueEntityId) {
    return new Attachment(props, id);
  }
}