import { Body, Controller, Post, UnauthorizedException, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validations-pipes";
import z from "zod";
import { AuthenticateStudentUseCase } from "@/domain/forum/application/use-cases/student/authenticate-student";


const authenticateSchema = z.object({
  email: z.email(),
  password: z.string(),
})

type AuthenticateSchema = z.infer<typeof authenticateSchema>;

@Controller('/sessions')
export class AutheticateController {
  constructor(
    private authenticateStudent: AuthenticateStudentUseCase
  ) { }

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateSchema))
  async handle(@Body() body: AuthenticateSchema) {
    const { email, password } = body;

    const result = await this.authenticateStudent.execute({
      email,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;
      throw new UnauthorizedException(error.message);
    }

    const { accessToken } = result.value;

    return {
      access_token: accessToken,
    };
  }

}