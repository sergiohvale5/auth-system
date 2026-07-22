import type {
    Request, 
    Response} 
from "express";

import 
    logger 
from "../winston/logges";

import { 
    postRegistroUsersService, 
    postLoginUsersService, 
    buscarDadosUserService, 
    putAtualizarSenhaService,
    postAuthGoogleService
} from "../service/usersService";

import { 
    emailQueue 
} from "../queues/emailQueue";

export const postRegistroUsersController = async (req: Request, res: Response) => {
    try{
        logger.info("Iniciando processo de envio dos dados cadastrais do usuário ao banco de dados...")

        const {nome, email, senha} = req.body;

        const resposta = await postRegistroUsersService(nome, email, senha);

        return res.status(201).json(resposta);
    }catch(err){
        logger.error("Erro de servidor ao enviar dados cadastrais do usuário ao banco de dados: ", {
            error: err
        });

        return res.status(500).json({
            message: "Erro de servidor",
            error: err
        })
    }
} 

export const postLoginUsersController = async (req: Request, res: Response) => {
    try{
        logger.info("Iniciando processo de envio dos dados de login do usuário ao banco de dados...");

        const { email, senha } = req.body;
        
        const resposta = await postLoginUsersService(email, senha);

        return res.status(200).json(resposta);
    }catch(err){
        logger.error("Erro de servidor ao enviar dados de login do usuário ao banco de dados: ", {
            error: err
        });

        return res.status(500).json({
            message: "Erro de servidor",
            error: err
        })
    }
}

export const postRedefinirSenhaController = async (req: Request, res: Response) => {
    try{
        logger.info("Iniciando processo de envio do link de redefinição de senha ao usuário...");

        const {email} = req.body;

        await emailQueue.add(
            "send-email-queue",
            {
                email
            },

            {
                attempts: 3,
                delay: 5000,
                removeOnComplete: true,
                removeOnFail: 100
            }
        )

        logger.info("Job de recuperação de senha adicionado a fila");

        return res.status(200).json(
            {
                message: "Solicitação de envio de email recebido"
            }
        );
    }catch(err){
        logger.error("Erro de servidor ao enviar link de redefinição de senha ao usuário: ", {
            error: err
        });

        return res.status(500).json({
            message: "Erro de servidor",
            error: err
        })
    }
}

export const postDadosUserController = async (req: Request, res: Response) => {
    try{
        logger.info("Iniciando processo de busca dos dados do usuário...");

        const {email} = req.body;

        const resposta = await buscarDadosUserService(email);

        return res.status(200).json(resposta);
    }catch(err){
        logger.error("Erro de servidor ao buscar dados do usuário", {
            error: err
        })

        return res.status(500).json({
            message: "Erro de servidor",
            error: err
        })
    }
}

export const putAtualizacaoSenhaController = async (req: Request, res: Response) => {
    try{
        logger.info("Iniciando processo de atualização de senha do usuário...");

        const {senha} = req.body;

        const {id} = req.params;

        const idNumber = Number(id);

        const resposta = await putAtualizarSenhaService(senha, idNumber);

        return res.status(200).json(resposta);
    }catch(err){
        logger.error("Erro de servidor ao atualizar senha do usuário: ", {
            error: err
        })

        return res.status(500).json({
            message: "Erro de servidor",
            error: err
        })
    }
}

export const postAuthGoogleController = async (req: Request, res: Response) => {
    try{
        logger.info("Iniciando processo de autenticação do usuário com o google...");

        const { token } = req.body;

        const resposta = await postAuthGoogleService(token);

        return res.status(200).json(
            {
                resposta
            }
        )
    }catch(err){
        logger.info("Erro de autenticação com o google do usuário no servidor", {
            error: err
        });

        return res.status(500).json(
            {
                message: "Error de servidor",
                error: err
            }
        )
    }
}