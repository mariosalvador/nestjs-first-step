import { Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "src/auth/current-user-decorator";
import { type UserPayload } from "src/auth/jwt-strategy";
import { PrismaService } from "src/prisma/prisma.service";

@Controller("/questions")
@UseGuards(AuthGuard("jwt"))
export class CreateQuestionsController {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  @Post()
  async handle(@CurrentUser() user: UserPayload) {
    return user;
  }
}