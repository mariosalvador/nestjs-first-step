import { Body, Controller, HttpCode, Param, Put, BadRequestException } from "@nestjs/common";
import { CurrentUser } from "@/infra/http/auth/current-user-decorator";
import { type UserPayload } from "@/infra/http/auth/jwt-strategy";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validations-pipes";
import z from "zod";
import { EditQuestionsUseCase } from "@/domain/forum/application/use-cases/questions/edit-question";

const editQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

type EditQuestionBodySchema = z.infer<typeof editQuestionBodySchema>

const bodyValidationPipe = new ZodValidationPipe(editQuestionBodySchema);

@Controller("/questions/:id")
export class EditQuestionController {
  constructor(private editQuestion: EditQuestionsUseCase) { }

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditQuestionBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('id') questionId: string,
  ) {
    const { title, content } = body

    const result = await this.editQuestion.execute({
      title,
      content,
      authorId: user.sub,
      attachmentsIds: [],
      questionId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
