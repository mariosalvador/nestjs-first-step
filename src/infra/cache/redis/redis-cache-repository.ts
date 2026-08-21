import { Injectable } from "@nestjs/common";
import { CacheRepository } from "../cache-repository";
import { RedisService } from "./redis.service";


const CACHE_TTL = 60 * 15; // 15 minutos

@Injectable()
export class RedisCacheRepository implements CacheRepository {
  constructor(
    private redis: RedisService
  ) { }

  async get(key: string): Promise<string | null> {
    const value = await this.redis.get(key);

    return value;
  }

  async set(key: string, value: string): Promise<void> {
    await this.redis.set(key, value, "EX", CACHE_TTL);
  }

  async delete(key: string): Promise<void> {
    await this.redis.del(key)
  }
}