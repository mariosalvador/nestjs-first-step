

import { Injectable } from "@nestjs/common";
import { Env } from "@/env";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class EnvService {
  constructor(
    private readonly config: ConfigService<Env, true>
  ) { }

  get(key: keyof Env) {
    return this.config.get(key, { infer: true });
  }
}