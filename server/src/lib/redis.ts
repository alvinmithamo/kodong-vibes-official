import Redis from "ioredis";
import { config } from "../config";

export const redis = new Redis(config.redisUrl);

export async function withLock<T>(key: string, ttlMs: number, task: () => Promise<T>): Promise<T> {
  const lockKey = `lock:${key}`;
  const acquired = await redis.set(lockKey, "1", "PX", ttlMs, "NX");
  if (!acquired) {
    throw new Error("Resource is locked. Please retry.");
  }
  try {
    return await task();
  } finally {
    await redis.del(lockKey);
  }
}
