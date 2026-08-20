import { Controller, HttpCode, Param, Patch, BadRequestException } from "@nestjs/common";
import { CurrentUser } from "@/infra/http/auth/current-user-decorator";
import { type UserPayload } from "@/infra/http/auth/jwt-strategy";
import { ChooseTheBestAnswerForQuestionUseCase } from "@/domain/forum/application/use-cases/answer/choose-the-best-answer-question";

@Controller("/answers/:answerId/choose-as-best")
export class ChooseQuestionBestAnswerController {
  constructor(private chooseBestAnswer: ChooseTheBestAnswerForQuestionUseCase) { }

  @Patch()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('answerId') answerId: string,
  ) {
    const result = await this.chooseBestAnswer.execute({
      answerId,
      authorId: user.sub,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
