import "../../style/esqueceu senha/auth_formulario_esqueceu_senha.css";
import { MdOutlineEmail } from "react-icons/md";
import { useState } from "react";
import { recuperacao_senha } from "../../service/authServiceApi";
import { useNavigate } from "react-router-dom";

function Auth_Formulario_Esqueceu_Senha(){
    const [email, setEmail] = useState<string>("");

    const navigate = useNavigate();

    async function redefinicaoSenha(){
        if(!email){
            alert("Campo obrigatório");
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

            alert("Se existir uma conta vinculada a este e-mail, enviaremos um link para redefinição de senha. Verifique sua caixa de entrada ou spam.");

            navigate("/");
        }catch(err){
            console.error(err);
            alert("Email incorreto")
        }
    }

    return(
        <>
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