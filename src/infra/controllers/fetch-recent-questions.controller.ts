import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validations-pipes";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { paginate } from "src/helpers/pagination";
import z from "zod";

const queryParamsSchema = z.object({
  page: z
    .string()
    .optional()
    .default("1")
    .transform(Number)
    .pipe(z.number().int().min(1)),

  limit: z
    .string()
    .optional()
    .default("20")
    .transform(Number)
    .pipe(z.number().int().min(1)),
});

const queryParamsValidator = new ZodValidationPipe(queryParamsSchema);

@Controller("/questions")
@UseGuards(AuthGuard("jwt"))
export class FetchRecentQuestionsController {
  constructor(private prisma: PrismaService) { }

  @Get()
  async handle(
    @Query(queryParamsValidator)
    query: z.infer<typeof queryParamsSchema>,
  ) {
    const { page, limit } = query;

    const result = await paginate(
      this.prisma.question,
      {
        page,
        limit,
      },
      {
        orderBy: {
          createdAt: "desc",
        },
      },
    );

    return {
      questions: result.data,
      pagination: result.pagination,
    };
  }
}