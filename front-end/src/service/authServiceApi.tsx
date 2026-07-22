import {env} from "../config/env"
import type { 
    CredenciaisRegistro, 
    CredenciaisLogin, 
    CredenciaisRedefinicaoSenha, 
    CredenciaisAtualizacaoSenha, 
    AuthGoogle 
} from "../types/authTipos";

export const authRegistro = async (credenciais: CredenciaisRegistro) => {
    try{
        const resposta = await fetch(env.api_url_registro, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(credenciais)
        })

        if(!resposta.ok){
            const error = await resposta.json();
            console.warn(error.message);
            throw new Error(error.message)
        }

        const authRetorno = await resposta.json();

        return authRetorno;
    }catch(err){
        console.error({
            message: "Erro ao cadastrar usuário",
            error: err
        });
        throw err;
    }
}

export const authLogin = async (credenciais: CredenciaisLogin) => {
    try{
        const resposta = await fetch(env.api_url_login, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(credenciais)
        })

        if(!resposta.ok){
            const error = await resposta.json();
            console.warn(error.message);
            throw new Error(error.message);
        }

        const {token} = await resposta.json();

        localStorage.setItem("token", token);

        return token
    }catch(err){
        console.error({
            message: "Erro ao logar usuário",
            error: err
        });

        throw err;
    }
}

export const recuperacao_senha = async(email: CredenciaisRedefinicaoSenha) => {
    try{
        const resposta = await fetch(env.api_url_redeficao_senha, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(email)
        })

        if(!resposta.ok){
            const error = await resposta.json();
            console.warn(error.message);
            throw new Error(error.message);
        }

        const retorno = await resposta.json();

        return retorno
    }catch(err){
        console.error({
            message: "Erro ao enviar link de recuparação de senha",
            error: err
        })

        throw err
    }
}

export const dadosUser = async (email: CredenciaisRedefinicaoSenha) => {
    try{
        const resposta = await fetch(env.api_url_dadosUser, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(email)
        })

        if(!resposta.ok){
            const error = await resposta.json();
            console.log(error.message);
            throw new Error(error.message)
        }

        const {user} = await resposta.json();

        return user;
    }catch(err){
        console.error({
            message: "Erro ao buscar dados do usuário",
            error: err
        })

        throw err;
    }
}

export const redefinir_senha = async(senha: CredenciaisAtualizacaoSenha, id: number) => {
    try{
        const resposta = await fetch(`${env.api_url_atualizar_senha}${id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(senha)
        })

        if(!resposta.ok){
            const error = await resposta.json();
            console.log(error.message);
            throw new Error(error.message);
        }

        const retorno = await resposta.json();

        return retorno;
    }catch(err){
        console.error({
            message: "Erro ao atualizar de senha do usuário",
            error: err
        })

        throw err
    }
}

export const authGoogle = async (token: AuthGoogle) => {
    try{
        const resposta = await fetch(env.api_url_auth_google, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(token)
        });
        
        if(!resposta.ok){
            const error = await resposta.json();
            console.log(error.message);
            throw new Error(error.message);
        }

        const retorno = await resposta.json();

        return retorno;
    }catch(err){
        console.error('Erro de atenticação via google', {
            error: err
        });

        throw err;
    }
} 