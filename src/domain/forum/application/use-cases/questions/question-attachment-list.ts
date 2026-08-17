import { WatchedList } from "src/core/entities/watched-list";
import { QuestionAttachment } from "src/domain/forum/enterprise/entities/questions-attachment";


export class QuestionAttachmentList extends WatchedList<QuestionAttachment> {
  compareItems(a: QuestionAttachment, b: QuestionAttachment): boolean {
    return a.attachmentId.equals(b.attachmentId);
  }
}
