# Sistema de Autenticação

Aplicação Full Stack para autenticação de usuários desenvolvida com
React, Node.js e TypeScript.

O sistema oferece cadastro e login com e-mail e senha, autenticação com
Google OAuth, recuperação de senha por e-mail e autenticação com JWT,
seguindo boas práticas de segurança.

## Funcionalidades

-   Cadastro de usuários
-   Login com e-mail e senha
-   Login/Cadastro com Google
-   Recuperação de senha
-   Redefinição de senha
-   Hash de senhas com bcrypt
-   Autenticação JWT
-   Validação de dados
-   Logs da aplicação
-   Proteção contra excesso de requisições
-   Processamento assíncrono de e-mails

## Tecnologias Utilizadas

### Front-end

-   React
-   TypeScript
-   React Router DOM
-   React Icons
-   Google OAuth
-   Fetch API
-   CSS3

### Back-end

-   Node.js
-   Express
-   TypeScript
-   SQLite
-   bcrypt
-   JWT
-   Zod
-   Nodemailer
-   Redis
-   BullMQ
-   Winston
-   Morgan
-   Helmet
-   CORS
-   Express Rate Limit

### Testes

-   Vitest
-   Supertest

## Como executar

### Clonar

``` bash
git clone URL_DO_REPOSITORIO
```

### Instalar

Frontend

``` bash
cd front-end
npm install
```

Backend

``` bash
cd back-end
npm install
```

### Configurar ambiente

Crie um arquivo `.env` baseado no exemplo abaixo:

back-end

``` env
PORT=
JWT_SECRET=
EMAIL_USER=
EMAIL_PASS=
URL_REDEFINIR_SENHA=
URL_REDIS=
REDIS_HOST=
REDIS_PORT=
CLIENTE_ID_GOOGLE=
```

front-end

``` env
VITE_API_URL_REGISTRO=
VITE_API_URL_LOGIN=
VITE_API_URL_REDEFINICAO_SENHA=
VITE_API_URL_ATUALIZAR_SENHA=
VITE_API_URL_DADOSUSER=
VITE_CLIENTE_ID_GOOGLE=
VITE_URL_AUTH_GOOGLE=
```

### Executar

Backend

``` bash
npm run dev
```

Frontend

``` bash
npm run dev
```

## Endpoints

-   POST /users/registro
-   POST /users/login
-   POST /users/auth/google
-   POST /users/redefinir_senha
-   POST /users/dados_user
-   PUT /users/atualizar_senha/:id

## Recursos Implementados

-   Arquitetura em camadas
-   API REST
-   SQLite
-   JWT
-   bcrypt
-   Google OAuth
-   Zod
-   BullMQ + Redis
-   Nodemailer
-   Winston
-   Morgan
-   Helmet
-   Rate Limit
-   Testes automatizados

## Objetivo

Projeto desenvolvido para estudo de autenticação completa, APIs REST,
segurança, arquitetura em camadas e desenvolvimento Full Stack.

## Autor

**Sérgio Henrique Vale Júnior**
