import express from "express";
import logger from "../winston/logges";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import limit from "../config/limit";
import router from "../router/usersRouter";
import { env } from "../config/env";
import { redis } from "../config/redis";

import "../../src/queues/workers/emailWorker";

const server = express();

server.use(express.json());
server.use(cors({
    credentials: true
}));
server.use(morgan("dev"));
server.use(helmet());
server.use(limit);

server.use("/users", router);

async function inicializacao(){
    try{
        await redis.connect();

        server.listen(env.port, (err) => {
    
        if(err){
            logger.error("Erro ao iniciar o servidor: ", {
                message: err.message,
                error: err
            });

            return;
        }

        logger.info("Servidor iniciado");
        
    });
    }catch(err){
        logger.error("Erro ao iniciar aplicação", {
            error: err
        })
    }
        
}

inicializacao();

export default server;