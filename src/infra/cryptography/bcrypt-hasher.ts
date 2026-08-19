import { Hasher } from "@/domain/forum/application/repositories/cryptography/hasher";
import { Injectable } from "@nestjs/common";
import { compare, hash } from "bcrypt";

@Injectable()
export class BcryptHasher implements Hasher {
  async hash(plain: string): Promise<string> {
    return hash(plain, 10);
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash);
  }

}