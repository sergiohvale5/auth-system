import { Queue } from "bullmq";
import { redisConnect } from "../config/redis";
import logger from "../winston/logges";


export const emailQueue = new Queue(
    "queue-email",
    {
        connection: redisConnect
    }
)

logger.info("Fila de email inicializada");