import { Controller, Delete, HttpCode, Param, BadRequestException } from "@nestjs/common";
import { CurrentUser } from "@/infra/http/auth/current-user-decorator";
import { type UserPayload } from "@/infra/http/auth/jwt-strategy";
import { DeleteAnswersUseCase } from "@/domain/forum/application/use-cases/answer/delete-answer";

@Controller("/answers/:id")
export class DeleteAnswerController {
  constructor(private deleteAnswer: DeleteAnswersUseCase) { }

  @Delete()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('id') answerId: string,
  ) {
    const result = await this.deleteAnswer.execute({
      answerId,
      authorId: user.sub,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
