import { createClient } from "redis";
import { env } from "../config/env";
import logger from "../winston/logges";
import { RedisOptions } from "bullmq";

export const redis = createClient({
    url: env.url_redis
});

redis.on("error", (err) => {
    logger.error("Erro ao conectar redis", {
        error: err
    });
});

redis.on("connect", () => {
    logger.info("Redis conectado");
});

export const redisConnect: RedisOptions = {
    host: env.redis_host,
    port: Number(env.redis_port)
}