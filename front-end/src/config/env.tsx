export const env = {
    api_url_registro: "http://localhost:3000/users/registro",
    api_url_login: "http://localhost:3000/users/login",
    api_url_redeficao_senha: "http://localhost:3000/users/redefinir_senha",
    api_url_atualizar_senha: "http://localhost:3000/users/atualizar_senha/",
    api_url_dadosUser: "http://localhost:3000/users/dados_user",
    cliente_id_google: "950711848094-o4rmpa3vuvbd79j2amf1bb1c0r20tc4c.apps.googleusercontent.com",
    api_url_auth_google: "http://localhost:3000/users/auth/google"
};

if (!env.api_url_registro) {
    console.warn("API_URL_REGISTRO não foi definida.");
    throw new Error("API_URL_REGISTRO não foi definida.");
}

if(!env.api_url_login){
    console.warn("API_URL_LOGIN não foi definida.");
    throw new Error("API_URL_LOGIN não foi definida.");
}

if(!env.api_url_redeficao_senha){
    console.warn("API_URL_REDEFINICAO_SENHA não foi definida.");
    throw new Error("API_URL_REDEFINICAO_SENHA não foi definida.");
}

if(!env.api_url_atualizar_senha){
    console.warn("API_URL_ATUALIZAR_SENHA não foi definida.");
    throw new Error("API_URL_ATUALIZAR_SENHA não foi definida.");
}

if(!env.api_url_dadosUser){
    console.warn("API_URL_DADOSUSER_SENHA não foi definida.");
    throw new Error("API_URL_DADOSUSER não foi definida.");
}

if(!env.cliente_id_google){
    console.warn("CLIENTE_ID_GOOGLE não foi definido.");
    throw new Error("CLIENTE_ID_GOOGLE não foi definido.");
}

if(!env.api_url_auth_google){
    console.warn("API_URL_AUTH_GOOGLE não foi definido.");
    throw new Error("API_URL_AUTH_GOOGLE não foi definido.");
}