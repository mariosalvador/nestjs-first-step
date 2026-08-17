import { PaginationParams } from "src/core/repositories/pagination-params";
import { QuetionsComment } from "../../enterprise/entities/questions-comments";

export interface QuestionCommentsRepository {
  findById(id: string): Promise<QuetionsComment | null>;
  findManyByQuestionId(questionId: string, params: PaginationParams): Promise<QuetionsComment[]>;
  create(questionComment: QuetionsComment): Promise<void>;
  delete(questionComment: QuetionsComment): Promise<void>;
}
