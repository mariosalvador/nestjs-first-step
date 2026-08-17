import { PaginationParams } from "src/core/repositories/pagination-params";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export interface AnswerRepository {
  create(answer: Answer): Promise<void>;
  delete(answer: Answer): Promise<void>;
  findById(id: string): Promise<Answer | null>;
  edit(answer: Answer): Promise<void>;
  findManyAnswersByQuestionId(questionId: string, params: PaginationParams): Promise<Answer[]>;
}