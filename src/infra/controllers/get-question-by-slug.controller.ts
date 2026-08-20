import { Controller, Get, Param, BadRequestException } from "@nestjs/common";
import { GetQuestionsBySlugUseCase } from "@/domain/forum/application/use-cases/questions/get-question-by-slug";
import { QuestionDetailsPresenter } from "../http/presenters/question-details-presenter";

@Controller("/questions/:slug")
export class GetQuestionBySlugController {
  constructor(private getQuestionBySlug: GetQuestionsBySlugUseCase) { }

  @Get()
  async handle(@Param('slug') slug: string) {
    const result = await this.getQuestionBySlug.execute({
      slug,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    return { question: QuestionDetailsPresenter.toHTTP(result.value.question) };
  }
}
