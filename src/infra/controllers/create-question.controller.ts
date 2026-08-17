import { Body, Controller, Post, UseGuards, UsePipes } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "@/infra/http/auth/current-user-decorator";
import { type UserPayload } from "@/infra/http/auth/jwt-strategy";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validations-pipes";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import z from "zod";


const createQuestionSchema = z.object({
  title: z.string(),
  content: z.string(),
})

type CreateQuestionSchema = z.infer<typeof createQuestionSchema>

@Controller("/questions")
@UseGuards(AuthGuard("jwt"))
export class CreateQuestionsController {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  @Post()
  async handle(
    @Body(new ZodValidationPipe(createQuestionSchema)) body: CreateQuestionSchema,
    @CurrentUser() user: UserPayload
  ) {
    const { title, content } = body
    const slug = this.createSlug(title)
    const authorId = user.sub

    await this.prisma.question.create({
      data: {
        slug,
        title,
        content,
        authorId,
      },
    })

    return {
      message: "Question created successfully",
    }
  }


  private createSlug(text: string): string {
    return text.toLowerCase()
      .replace(/ /g, "-")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "").concat(Math.random().toString(36).substring(2, 10))
  }
}