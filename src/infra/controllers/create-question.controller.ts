import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "@/infra/http/auth/current-user-decorator";
import { type UserPayload } from "@/infra/http/auth/jwt-strategy";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validations-pipes";
import z from "zod";
import { CreateQuestionsUseCase } from "@/domain/forum/application/use-cases/questions/create-question";


const createQuestionSchema = z.object({
  title: z.string(),
  content: z.string(),
})

type CreateQuestionSchema = z.infer<typeof createQuestionSchema>

@Controller("/questions")
@UseGuards(AuthGuard("jwt"))
export class CreateQuestionsController {
  constructor(
    private readonly question: CreateQuestionsUseCase
  ) { }

  @Post()
  async handle(
    @Body(new ZodValidationPipe(createQuestionSchema)) body: CreateQuestionSchema,
    @CurrentUser() user: UserPayload
  ) {
    const { title, content } = body

    await this.question.execute({
      authorId: user.sub,
      title,
      content,
      attachmentIds: [],
    })

    return {
      message: "Question created successfully",
    }
  }
}