import logger from "../winston/logges";
import nodemailer from "nodemailer"
import { env } from "../config/env";

export const enviarEmailRecuperacaoSenha = async (email: string) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: env.email_user,
            pass: env.email_pass
        }
    })

    await transporter.sendMail({
        from: env.email_user,
        to: email,
        subject: "Redefinição de senha",
        text: 
        `
            Olá!

            Recebemos uma solicitação para redefinir a senha da sua conta.

            Acesse o link abaixo para criar uma nova senha:

            ${env.redefinir_senha}

            Se você não solicitou essa alteração, ignore este e-mail.
        `,

    html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
            <h2">Redefinição de senha</h2>

            <p>Olá!</p>

            <p>
                Recebemos uma solicitação para redefinir a senha da sua conta.
            </p>

            <p>
                Clique no botão abaixo para criar uma nova senha:
            </p>

            <p style="margin: 24px 0;">
                <a
                    href="${env.redefinir_senha}"
                    style="
                        background-color: #2563eb;
                        color: #ffffff;
                        padding: 12px 20px;
                        text-decoration: none;
                        border-radius: 6px;
                        display: inline-block;
                    "
                >
                    Redefinir senha
                </a>
            </p>

            <p>
                Caso o botão não funcione, copie e cole o link abaixo no seu navegador:
            </p>

            <p>
                <a href="${env.redefinir_senha}">${env.redefinir_senha}</a>
            </p>

            <hr style="margin: 30px 0;">

            <p style="color: #666;">
                Se você não solicitou essa alteração, ignore este e-mail.
                Sua senha permanecerá a mesma.
            </p>
        </div>
    `
    })

    logger.info("Link de redefinição de senha enviado");

    return {
        message: "Link de recuperação de senha enviado"
    }
}