import { ftruncate } from "node:fs";
import { env } from "../config/env";
import db from "../database/database";
import logger from "../winston/logges";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";


export const postRegistroUsersService = async (nome: string, email: string, senha: string) => {
    const senhaCrypt = await bcrypt.hash(senha, 10);

    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO usuarios(nome, email, senha) VALUES(?, ?, ?)`,
            [nome, email, senhaCrypt], function (err){
                if(err){
                    logger.error("Erro ao enviar dados cadastrais do usuário ao banco de dados: ", {
                        message: err.message,
                        error: err
                    });

                    return reject({error: err});
                }

                if(this.changes === 0){
                    logger.warn('Nenhuma crendencial foi registrada no banco de dados');

                    return reject({message: 'Nenhuma crendencial foi registrada no banco de dados'});
                }

                logger.info('Cresdenciais cadastradas');

                resolve({message: 'Usuário registrado'});
            }
        )
    })
}

export const postLoginUsersService = async (email: string, senha: string) => {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT * FROM usuarios WHERE email = ?`,
            [email], async function(err, row: any){
                if(err){
                    logger.error("Erro ao enviar dados de login do usuário ao banco de dados: ", {
                        message: err.message,
                        error: err
                    });

                    return reject({error: err});
                }

                if(!row){
                    logger.warn('Nenhuma crendencial foi encontrada no banco de dados');

                    return reject({message: 'Nenhuma crendencial foi encontrada no banco de dados'});
                }

                const senhaValida = await bcrypt.compare(senha, row.senha);

                if(!senhaValida){
                    logger.warn("Senha inválida");
                    return reject({message: "Senha inválida"});
                }

                const token = jwt.sign(
                    {
                        id: row.id,
                        email: row.email,
                    },

                    env.jwt_secret,

                    {
                        expiresIn: "1h"
                    }
                )

                logger.info("Dados de login validos");
                logger.info("Token de autenticação criado");

                return resolve(
                    {
                        token
                    }
                );
            }
        )
    })  
}

export const buscarDadosUserService = async (email: string) => {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT * FROM usuarios WHERE email = ?`,
            [email], (err, row: any) => {
                if(err){
                    logger.error("Erro ao buscar dados do usuário no banco de dados", {
                        message: err.message,
                        error: err
                    })

                    return reject({error: err})
                }

                if(!row){
                    logger.warn("Nenhum usuário encontrado no banco de dados");
                    reject({message: "Usuário não encontrado"})
                }

                logger.info("Busca dos dados do usuário realizada com sucesso");

                return resolve(
                    {
                        user: row.id
                    }
                )
            }
        )
    })
}

export const putAtualizarSenhaService = async (senha: string, id: number) => {
    const senhaCrypt = await bcrypt.hash(senha, 10)

    return new Promise((resolve, reject) => {
        db.run(
            `UPDATE usuarios SET senha = ? WHERE id = ?`,
            [senhaCrypt, id], function (err){
                if(err){
                    logger.error("Erro ao atualizar senha do usuário: ", {
                        message: err.message,
                        error: err
                    })

                    return reject({error: err})
                }

                if(this.changes === 0){
                    logger.warn("Usuário não encontrado");
                    return reject({message: "Usuário não encontrado"})
                }

                logger.info("Senha do usuário atualizada");

                return resolve({message: "Senha do usuário atualizada"});
            }
        )
    })
}

export const postAuthGoogleService = async (token: string) => {
    const client = new OAuth2Client(env.cliente_id_google);

    const ticket = await client.verifyIdToken(
        {
            idToken: token,
            audience: env.cliente_id_google
        }
    )

    const dadosUser = ticket.getPayload();

    if(!dadosUser){
        logger.warn("Token do Google inválido");
        throw new Error("Token do Google inválido");
    }

    const email = dadosUser.email;
    const nome = dadosUser.name;

    return new Promise((resolve, reject) => {
        db.get(
            `SELECT * FROM usuarios WHERE email = ?`,
            [email], function (err, row: any){
                if(err){
                    logger.error("Erro ao buscar dados do usuário no banco de dados", {
                        message: err.message,
                        error: err
                    });

                    return reject(
                        {
                            error: err
                        }
                    )
                }

                if(row){
                    logger.info("Credencial do usuário encontrada");
                    
                    const jwtToken = jwt.sign(
                        {
                            id: row.id,
                            email: row.email
                        },

                        env.jwt_secret,

                        {
                            expiresIn: "1h"
                        }
                    )

                    return resolve(
                        {
                            jwtToken
                        }
                    )
                }else{
                    db.run(
                        `INSERT INTO usuarios(nome, email) VALUES(?, ?)`,
                        [nome, email], function(err){
                            if(err){
                                logger.error("Erro ao cadastrar usuário", 
                                    {
                                        message: err.message,
                                        error: err
                                    }
                                );

                                return reject(
                                    {
                                        error: err
                                    }
                                )
                            }

                            const jwtToken = jwt.sign(
                                {
                                    id: this.lastID,
                                    email
                                },

                                env.jwt_secret,

                                {
                                    expiresIn: "1h"
                                }
                            )

                            return resolve(
                                {
                                    jwtToken
                                }
                            )
                        }
                    )
                }
            }
        )
    })
}