import "../../style/esqueceu senha/auth_formulario_esqueceu_senha.css";
import { MdOutlineEmail } from "react-icons/md";
import { useState } from "react";
import { recuperacao_senha } from "../../service/authServiceApi";
import { useNavigate } from "react-router-dom";

function Auth_Formulario_Esqueceu_Senha(){
    const [email, setEmail] = useState<string>("");
    const [sucesso, setSucesso] = useState<string>("");
    const [alerta, setAlerta] = useState<string>("");
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    async function redefinicaoSenha(){
        if(!email){
            setAlerta("Campo obrigatório");

            setTimeout(() => {
                setAlerta("");
            }, 3000);

            return;
        }

        try{
            await recuperacao_senha(
                {
                    email: email
                }
            );

            localStorage.setItem("emailRecuperação", email);

            setEmail("");

            setSucesso("Se existir uma conta vinculada a este e-mail, enviaremos um link para redefinição de senha. Verifique sua caixa de entrada ou spam.");

            setTimeout(() => {
                setSucesso("");

                navigate("/");
            }, 1500);
        }catch(err){
            console.error(err);

            setError("Email incorreto");

            setTimeout(() => {
                setError("");
            }, 3000);

            throw err;
        }
    }

    return(
        <>
            {
                sucesso && (
                    <div className="notificacao_sucesso">
                        {sucesso}
                    </div>
                )
            }

            {
                alerta && (
                    <div className="notificacao_alerta">
                        {alerta}
                    </div>
                )
            }

            {
                error && (
                    <div className="notificacao_error">
                        {error}
                    </div>
                )
            }

            <p className='email_esqueceu_senha'>E-mail</p>
            
            <div className='conteiner_input_email_esqueceu_senha'>
                <MdOutlineEmail className='icone_email_esqueceu_senha'/>

                <input type="text" className='input_email_esqueceu_senha' placeholder='voce@email.com'
                    value={email}

                    onChange={(event) => setEmail(event.target.value)}
                />
            </div>

                <br />

            <button type='button' className='btn_evr_link_recuperacao' onClick={() => redefinicaoSenha()}>
                Envia link de recuperação
                </button>

                <br />

            <hr />
        </>
    )
}

export default Auth_Formulario_Esqueceu_Senha;