import { Worker } from "bullmq";
import logger from "../../winston/logges";
import { enviarEmailRecuperacaoSenha } from "../../service/emailService";
import { redisConnect } from "../../config/redis";

const worker = new Worker(
    "queue-email",

    async(job) => {
        logger.info("Iniciando processamento do job");

        await enviarEmailRecuperacaoSenha(job.data.email);

        logger.info("Email enviado");
    },

    {
        connection: redisConnect,
        concurrency: 5
    }
)

worker.on("completed", (job) => {
    logger.info("Job processado com sucesso", {
        job: job
    })
})

worker.on("failed", (err) => {
    logger.error("Falha ao processar job", 
        {
            error: err
        }
    )
})