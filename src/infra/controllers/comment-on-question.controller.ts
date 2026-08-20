import { Body, Controller, Param, Post, BadRequestException } from "@nestjs/common";
import { CurrentUser } from "@/infra/http/auth/current-user-decorator";
import { type UserPayload } from "@/infra/http/auth/jwt-strategy";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validations-pipes";
import z from "zod";
import { CommentOnQuestionUseCase } from "@/domain/forum/application/use-cases/questions/comment-on-question";

const commentOnQuestionBodySchema = z.object({
  content: z.string(),
})

type CommentOnQuestionBodySchema = z.infer<typeof commentOnQuestionBodySchema>

const bodyValidationPipe = new ZodValidationPipe(commentOnQuestionBodySchema);

@Controller("/questions/:questionId/comments")
export class CommentOnQuestionController {
  constructor(private commentOnQuestion: CommentOnQuestionUseCase) { }

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CommentOnQuestionBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('questionId') questionId: string,
  ) {
    const { content } = body

    const result = await this.commentOnQuestion.execute({
      content,
      questionId,
      authorId: user.sub,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
