import { Controller, Delete, HttpCode, Param, BadRequestException } from "@nestjs/common";
import { CurrentUser } from "@/infra/http/auth/current-user-decorator";
import { type UserPayload } from "@/infra/http/auth/jwt-strategy";
import { DeleteQuestionCommentUseCase } from "@/domain/forum/application/use-cases/questions/delete-question-comment";

@Controller("/questions/comments/:id")
export class DeleteQuestionCommentController {
  constructor(private deleteQuestionComment: DeleteQuestionCommentUseCase) { }

  @Delete()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('id') questionCommentId: string,
  ) {
    const result = await this.deleteQuestionComment.execute({
      questionCommentId,
      authorId: user.sub,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
