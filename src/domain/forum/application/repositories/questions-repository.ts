import { PaginationParams } from "src/core/repositories/pagination-params";
import { Question } from "../../enterprise/entities/questions";


export abstract class QuestionRepository {
  abstract findById(id: string): Promise<Question | null>
  abstract findManyRecent(params: PaginationParams): Promise<Question[]>
  abstract edit(question: Question): Promise<void>
  abstract create(question: Question): Promise<void>
  abstract findBySlug(slug: string): Promise<Question | null>
  abstract delete(question: Question): Promise<void>
}