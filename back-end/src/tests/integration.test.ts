import {describe, it, expect} from "vitest";
import request from "supertest";
import server from "../server/server";

describe("POST /users/registro", () => {
    /*it("Cadastro de usuário", async () => {
        const resposta = await request(server).post("/users/registro").send(
            {
                nome: "Sérgio",
                email: "sergio@gmail.com",
                senha: "@_Clavedesol_890765"
            }
        )

        expect(resposta.status).toBe(201);
        expect(resposta.body).toEqual({message: 'Usuário registrado'});
    })*/

    /*it("Login de usuário", async() => {
        const resposta = await request(server).post("/users/login").send(
            {
                email: "sergio@gmail.com",
                senha: "@_Clavedesol_2000"
            }
        )

        expect(resposta.status).toBe(200);
    })*/

    /*it("Redefinição de senha", async() => {
        const resposta = await request(server).post("/users/redefinir_senha").send(
            {
                email: "infoma o email do destinatário"
            }
        )

        expect(resposta.status).toBe(200);
        expect(resposta.body).toEqual({message: "Link de recuperação de senha enviado"});
    })*/

    /*it("Atualizar senha", async() => {
        const resposta = await request(server).put('/users/atualizar_senha/:id').send(
            {
                senha: ""
            }
        )

        expect(resposta.status).toBe(200);
        expect(resposta.body).toEqual({message: "Senha do usuário atualizada"});
    })*/

    /*it("Buscar dados do usuário", async() => {
        const resposta = await request(server).post('/users/dados_user').send(
            {
                email: "sergio@gmail.com"
            }
        )

        expect(resposta.status).toBe(200);
    })*/
})