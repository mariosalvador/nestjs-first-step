import { Controller, Delete, HttpCode, Param, BadRequestException } from "@nestjs/common";
import { CurrentUser } from "@/infra/http/auth/current-user-decorator";
import { type UserPayload } from "@/infra/http/auth/jwt-strategy";
import { DeleteQuestionsUseCase } from "@/domain/forum/application/use-cases/questions/delete-question";

@Controller("/questions/:id")
export class DeleteQuestionController {
  constructor(private deleteQuestion: DeleteQuestionsUseCase) { }

  @Delete()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('id') questionId: string,
  ) {
    const result = await this.deleteQuestion.execute({
      questionId,
      authorId: user.sub,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
