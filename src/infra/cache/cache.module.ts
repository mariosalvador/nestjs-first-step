import { Module } from "@nestjs/common";
import { RedisService } from "./redis/redis.service";
import { EnvModule } from "../env.module";
import { CacheRepository } from "./cache-repository";
import { RedisCacheRepository } from "./redis/redis-cache-repository";

@Module({
  imports: [
    EnvModule
  ],
  providers: [
    RedisService,
    {
      provide: CacheRepository,
      useClass: RedisCacheRepository
    }
  ],
  exports: [
    RedisService,
    CacheRepository
  ],
})
export class CacheModule { }