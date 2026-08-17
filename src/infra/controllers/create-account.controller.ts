import { BadRequestException, Body, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { PrismaService } from "@/infra/http/prisma/prisma.service";
import { hash } from "bcrypt";
import { z } from "zod";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validations-pipes";

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@Controller("/accounts")
export class CreateAccountController {
  constructor(private prisma: PrismaService) { }

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body;

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email
      }
    })

    if (userWithSameEmail) {
      throw new BadRequestException("User already exists")
    }

    const passwordHash = await hash(password, 10);

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash
      }
    })
  }
}