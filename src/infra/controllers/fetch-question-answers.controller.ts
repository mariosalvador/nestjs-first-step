import { Controller, Get, Query, Param, BadRequestException } from "@nestjs/common";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validations-pipes";
import { FetchQuestionAnswersUseCase } from "@/domain/forum/application/use-cases/answer/fetch-questions-answer";
import z from "zod";
import { AnswerPresenter } from "../http/presenters/answer-presenter";

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

@Controller("/questions/:questionId/answers")
export class FetchQuestionAnswersController {
  constructor(private fetchQuestionAnswers: FetchQuestionAnswersUseCase) { }

  @Get()
  async handle(
    @Query(queryParamsValidator) query: QueryParamsSchema,
    @Param('questionId') questionId: string,
  ) {
    const { page } = query;

    const result = await this.fetchQuestionAnswers.execute({
      page,
      questionId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const answers = result.value.answers;

    return {
      answers: answers.map(AnswerPresenter.toHTTP),
    };
  }
}
