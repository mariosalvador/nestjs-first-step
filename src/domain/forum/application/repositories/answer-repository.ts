import { PaginationParams } from "src/core/repositories/pagination-params";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export abstract class AnswerRepository {
  abstract create(answer: Answer): Promise<void>;
  abstract delete(answer: Answer): Promise<void>;
  abstract findById(id: string): Promise<Answer | null>;
  abstract edit(answer: Answer): Promise<void>;
  abstract findManyAnswersByQuestionId(questionId: string, params: PaginationParams): Promise<Answer[]>;
}