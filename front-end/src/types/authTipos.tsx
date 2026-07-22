export type CredenciaisRegistro = {
    nome: string,
    email: string,
    senha: string
}

export type CredenciaisLogin = {
    email: string,
    senha: string
}

export type CredenciaisRedefinicaoSenha = {
    email: string
}

export type CredenciaisAtualizacaoSenha = {
    senha: string
}

export type AuthGoogle = {
    token: string
}