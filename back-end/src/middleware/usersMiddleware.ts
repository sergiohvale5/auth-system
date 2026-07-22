import type {
    Request, 
    Response, 
    NextFunction
} from "express";

import 
    logger 
from "../winston/logges";

import { 
    dadosCadastrais, 
    dadosLogin, 
    dadosRedefinirSenha,
    dadosAtualizarSenha,
    tokenUser
} from "../schema/usersSchema";

import 
    jwt 
from "jsonwebtoken";

import { 
    env 
} from "../config/env";

export const validacaoDadosCadastraisUsers = (req: Request, res: Response, next: NextFunction) => {
    logger.info("Iniciando processo de validação das credenciais do usuario...");

    const {nome, email, senha} = req.body;

    const dadosCadastraisValidos = dadosCadastrais.safeParse({nome, email, senha});

    if(!dadosCadastraisValidos.success){
        logger.warn('Dados cadastrais inválidos: ', {
            data: dadosCadastraisValidos.data,
            error: dadosCadastraisValidos.error.format()
        });

        return res.status(400).json({
            message: "Requisição de cadastro inválida",
        });
    }

    logger.info("Dados cadastrais validados");

    next();
}

export const validacaoDadosLoginUsers = (req: Request, res: Response, next: NextFunction) => {
    logger.info("Iniciando processo de validação dos dados de login do usuario...");

    const { email, senha } = req.body;

    const dadosLoginValidos = dadosLogin.safeParse({email, senha});

    if(!dadosLoginValidos.success){
        logger.warn('Dados de login inválidos', {
            data: dadosLoginValidos.data,
            error: dadosLoginValidos.error.format()
        })

        return res.status(400).json({
            message: "Requisição de login inválida"
        })
    }

    logger.info("Dados de login válidos");

    next();
}

export const validarTokenAuth = (req: Request, res: Response, next: NextFunction) => {
    logger.info("Iniciando processo de validação do token de autenticação...");

    const tokenHeaders = req.headers.authorization;

    if(!tokenHeaders){
        logger.warn("Token não fornecido");
        return res.status(401).json({
            message: "Requisição inválida. Token não fornecido"
        })
    }

    const token = tokenHeaders.split(" ")[1];

    if(!token){
        logger.warn("Formato do token inválido");
        return res.status(400).json({
            message: "Requisição inválida. Formato do token inválido"
        })
    }

    try{
        const tokenValido = jwt.verify(token, env.jwt_secret);

        (req as any).user = tokenValido;

        next();
    }catch(err){
        logger.error("Token inválido ou expirado", {
            error: err
        });

        return res.status(401).json({
            message: "Token inválido ou expirado",
            error: err
        })
    }
}

export const validacaoDadosRedefinirSenha = (req: Request, res: Response, next: NextFunction) => {
    logger.info("Iniciando processo de validação dos dados do usuário para redefinição de senha...");

    const {email} = req.body;

    const dadosRedefinicaoSenhaValida = dadosRedefinirSenha.safeParse({email});

    if(!dadosRedefinicaoSenhaValida.success){
        logger.warn('Email inválido');
        return res.status(400).json({
            message: 'Requisição de redefinição de senha inválida',
            error: dadosRedefinicaoSenhaValida.error.format()
        })
    }

    next();
}

export const validacaoDadosAtualizarSenha = (req: Request, res: Response, next: NextFunction) => {
    logger.info("Iniciando processo de validação dos dados do usuário para atualização da senha...");

    const {senha} = req.body;

    const dadosAtualizacaoSenhaValida = dadosAtualizarSenha.safeParse({senha});

    if(!dadosAtualizacaoSenhaValida.success){
        logger.warn('Senha inválida');
        return res.status(400).json({
            message: 'Requisição de atualização de senha inválida',
            error: dadosAtualizacaoSenhaValida.error.format()
        })
    }

    logger.info("Senha válida")

    next();
}

export const validarToken = (req: Request, res: Response, next: NextFunction) => {
    logger.info("Iniciando processo de validação de token de autenticação com o google...");

    const { token } = req.body;

    const tokenUserValido = tokenUser.safeParse(
        {
            token
        }
    )

    if(!tokenUserValido.success){
        logger.warn("Token de autenticação com o google inválido")

        return res.status(400).json(
            {
                message: "Requeseição de autenticaçãoinválida",
                error: tokenUserValido.error.format()
            }
        )
    }

    next();
}