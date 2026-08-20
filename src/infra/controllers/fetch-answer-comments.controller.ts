import { Controller, Get, Query, Param, BadRequestException } from "@nestjs/common";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validations-pipes";
import { FetchAnswerCommentsUseCase } from "@/domain/forum/application/use-cases/answer/fetch-answer-comments";
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

@Controller("/answers/:answerId/comments")
export class FetchAnswerCommentsController {
  constructor(private fetchAnswerComments: FetchAnswerCommentsUseCase) { }

  @Get()
  async handle(
    @Query(queryParamsValidator) query: QueryParamsSchema,
    @Param('answerId') answerId: string,
  ) {
    const { page } = query;

    const result = await this.fetchAnswerComments.execute({
      page,
      answerId,
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
