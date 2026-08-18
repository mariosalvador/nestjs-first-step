import { Controller, Get, Query, UseGuards, BadRequestException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validations-pipes";
import { FetchRecentQuestionsUseCase } from "@/domain/forum/application/use-cases/questions/fetch-recent-question";
import z from "zod";
import { QuestionPresenter } from "../http/presenters/question-presenter";

const queryParamsSchema = z.object({
  page: z
    .string()
    .optional()
    .default("1")
    .transform(Number)
    .pipe(z.number().int().min(1)),
});

const queryParamsValidator = new ZodValidationPipe(queryParamsSchema);

type QueryParamsSchema = z.infer<typeof queryParamsSchema>;

@Controller("/questions")
@UseGuards(AuthGuard("jwt"))
export class FetchRecentQuestionsController {
  constructor(private fetchRecentQuestions: FetchRecentQuestionsUseCase) { }

  @Get()
  async handle(
    @Query(queryParamsValidator) query: QueryParamsSchema,
  ) {
    const { page } = query;

    const result = await this.fetchRecentQuestions.execute({
      page,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const questions = result.value.questions;

    return {
      questions: questions.map(QuestionPresenter.toHTTP),
    };
  }
}
