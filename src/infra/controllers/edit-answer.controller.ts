import { Body, Controller, HttpCode, Param, Put, BadRequestException } from "@nestjs/common";
import { CurrentUser } from "@/infra/http/auth/current-user-decorator";
import { type UserPayload } from "@/infra/http/auth/jwt-strategy";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validations-pipes";
import z from "zod";
import { EditAnswersUseCase } from "@/domain/forum/application/use-cases/answer/edit-answer";

const editAnswerBodySchema = z.object({
  content: z.string(),
  attachmentsIds: z.array(z.string()).default([]),
})

type EditAnswerBodySchema = z.infer<typeof editAnswerBodySchema>

const bodyValidationPipe = new ZodValidationPipe(editAnswerBodySchema);

@Controller("/answers/:id")
export class EditAnswerController {
  constructor(private editAnswer: EditAnswersUseCase) { }

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditAnswerBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('id') answerId: string,
  ) {
    const { content, attachmentsIds } = body

    const result = await this.editAnswer.execute({
      content,
      authorId: user.sub,
      attachmentsIds,
      answerId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
