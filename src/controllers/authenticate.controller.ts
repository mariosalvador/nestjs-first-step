import { Controller, Post } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Controller('/sessions')
export class AutheticateController {
  constructor(
    private readonly jwtService: JwtService,
  ) { }

  @Post()
  async handle() {
    const token = this.jwtService.sign({
      sub: "user-id"
    })
    return token;
  }

}