import { Body, Controller, Post, UnauthorizedException, UsePipes } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { ZodValidationPipe } from "src/pipes/zod-validations-pipes";
import { PrismaService } from "src/prisma/prisma.service";
import z from "zod";


const authenticateSchema = z.object({
  email: z.email(),
  password: z.string(),
})

type AuthenticateSchema = z.infer<typeof authenticateSchema>;

@Controller('/sessions')
export class AutheticateController {
  constructor(
    private readonly jwtService: JwtService,
    private prisma: PrismaService,
  ) { }

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateSchema))
  async handle(@Body() body: AuthenticateSchema) {
    const { email, password } = body;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({
      sub: user.id,
    });

    return {
      acess_token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    };
  }

}