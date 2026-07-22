import z from "zod";

export const dadosCadastrais = z.object({
    nome: z.string().min(3),
    email: z.string().email(),
    senha: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?`~]).+$/)
})

export const dadosLogin = z.object({
    email: z.string().email(),
    senha: z.string()
})

export const dadosRedefinirSenha = z.object({
    email: z.string().email()
})

export const dadosAtualizarSenha = z.object({
    senha: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?`~]).+$/)
})

export const tokenUser = z.object({
    token: z.string().min(5)
})