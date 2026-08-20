import { Controller, Get, Query, Param, BadRequestException } from "@nestjs/common";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validations-pipes";
import { FetchQuestionCommentsUseCase } from "@/domain/forum/application/use-cases/questions/fetch-question-comments";
import z from "zod";
import { CommentWithAuthorPresenter } from "../http/presenters/comment-with-author-presenter";

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

@Controller("/questions/:questionId/comments")
export class FetchQuestionCommentsController {
  constructor(private fetchQuestionComments: FetchQuestionCommentsUseCase) { }

  @Get()
  async handle(
    @Query(queryParamsValidator) query: QueryParamsSchema,
    @Param('questionId') questionId: string,
  ) {
    const { page } = query;

    const result = await this.fetchQuestionComments.execute({
      page,
      questionId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const comments = result.value.comments;

    return {
      comments: comments.map(CommentWithAuthorPresenter.toHTTP),
    };
  }
}
