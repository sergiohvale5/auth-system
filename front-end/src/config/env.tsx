export const env = {
    api_url_registro: import.meta.env.VITE_API_URL_REGISTRO,
    api_url_login: import.meta.env.VITE_API_URL_LOGIN,
    api_url_redeficao_senha: import.meta.env.VITE_API_URL_REDEFINICAO_SENHA,
    api_url_atualizar_senha: import.meta.env.VITE_API_URL_ATUALIZAR_SENHA,
    api_url_dadosUser: import.meta.env.VITE_API_URL_DADOSUSER,
    cliente_id_google: import.meta.env.VITE_CLIENTE_ID_GOOGLE,
    api_url_auth_google: import.meta.env.VITE_URL_AUTH_GOOGLE
}

if(!env.api_url_registro){
    console.error("env.api_url_registro é obrigatória");
    throw new Error("A variável de ambiente env.api_url_registro é obrigatória");
}

if(!env.api_url_login){
    console.error("env.api_url_login é obrigatória");
    throw new Error("A variável de ambiente env.api_url_login é obrigatória");
}

if(!env.api_url_redeficao_senha){
    console.error("env.api_url_redeficao_senha é obrigatória");
    throw new Error("A variável de ambiente env.api_url_redeficao_senha é obrigatória");
}

if(!env.api_url_atualizar_senha){
    console.error("env.api_url_atualizar_senha é obrigatória");
    throw new Error("A variável de ambiente env.api_url_atualizar_senha é obrigatória");
}

if(!env.api_url_dadosUser){
    console.error("api_url_dadosUser é obrigatória");
    throw new Error("A variável de ambiente api_url_dadosUser é obrigatória");
}

if(!env.cliente_id_google){
    console.error("env.cliente_id_google é obrigatória");
    throw new Error("A variável de ambiente env.cliente_id_google é obrigatória");
}

if(!env.api_url_auth_google){
    console.error("env.api_url_auth_google é obrigatória");
    throw new Error("A variável de ambiente env.api_url_auth_google é obrigatória");
}