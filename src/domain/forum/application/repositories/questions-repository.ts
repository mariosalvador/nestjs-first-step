import { PaginationParams } from "src/core/repositories/pagination-params";
import { Question } from "../../enterprise/entities/questions";


export interface QuestionRepository {
  findById(id: string): Promise<Question | null>
  findManyRecent(params: PaginationParams): Promise<Question[]>
  edit(question: Question): Promise<void>
  create(question: Question): Promise<void>
  findBySlug(slug: string): Promise<Question | null>
  delete(question: Question): Promise<void>
}