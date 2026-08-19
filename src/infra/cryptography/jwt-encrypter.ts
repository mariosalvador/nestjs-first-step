import { Encrypter } from "@/domain/forum/application/repositories/cryptography/encrypter";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";



@Injectable()
export class JwtEncrypter implements Encrypter {
  constructor(
    private readonly jwtService: JwtService,
  ) { }

  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return this.jwtService.sign(payload);
  }

  async decrypt(token: string): Promise<Record<string, unknown>> {
    return this.jwtService.verifyAsync(token);
  }

}