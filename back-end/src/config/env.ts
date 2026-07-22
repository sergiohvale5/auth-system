import dotenv from "dotenv";
import logger from "../winston/logges";

dotenv.config();

if(!process.env.PORT){
    logger.error("process.env.PORT é obrigatório");
    throw new Error("A variável de ambiente PORT é obrigatória.");
}

if(!process.env.JWT_SECRET){
    logger.error("process.env.JWT_SECRET é obrigatório");
    throw new Error("A variável de ambiente JWT_SECRET é obrigatória");
}

if(!process.env.EMAIL_USER){
    logger.error("process.env.EMAIL_USER é obrigatório");
    throw new Error("A variável de ambiente EMAIL_USER é obrigatória");
}

if(!process.env.EMAIL_PASS){
    logger.error("process.env.EMAIL_PASS é obrigatório");
    throw new Error("A variável de ambiente EMAIL_PASS é obrigatória");
}

if(!process.env.URL_REDEFINIR_SENHA){
    logger.error("process.env.URL_REDEFINIR_SENHA é obrigatório");
    throw new Error("A variável de ambiente URL_REDEFINIR_SENHA é obrigatória");
}

if(!process.env.URL_REDIS){
    logger.error("process.env.URL_REDIS é obrigatório");
    throw new Error("A variável de ambiente URL_REDIS é obrigatória");
}

if(!process.env.REDIS_HOST){
    logger.error("process.env.REDIS_HOST é obrigatório");
    throw new Error("A variável de ambiente REDIS_HOST é obrigatória");
}

if(!process.env.REDIS_PORT){
    logger.error("process.env.REDIS_PORT é obrigatório");
    throw new Error("A variável de ambiente REDIS_PORT é obrigatória");
}

if(!process.env.CLIENTE_ID_GOOGLE){
    logger.error("process.env.CLIENTE_ID_GOOGLE é obrigatório");
    throw new Error("A variável de ambiente CLIENTE_ID_GOOGLE é obrigatória");
}

export const env = {
    port: process.env.PORT,
    jwt_secret: process.env.JWT_SECRET,
    email_user: process.env.EMAIL_USER,
    email_pass: process.env.EMAIL_PASS,
    redefinir_senha: process.env.URL_REDEFINIR_SENHA,
    url_redis: process.env.URL_REDIS,
    redis_host: process.env.REDIS_HOST,
    redis_port: process.env.REDIS_PORT,
    cliente_id_google: process.env.CLIENTE_ID_GOOGLE
}