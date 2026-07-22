import '../../style/login/auth_formulario_login.css';
import { MdOutlineEmail } from "react-icons/md";
import { HiOutlineLockClosed } from "react-icons/hi";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { authLogin } from '../../service/authServiceApi';

function Auth_Formulario_Login(){
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [mostrarSenha, setMostrarSenha] = useState<boolean>(false);

    async function loginUser() {
        switch (true) {
            case !email:
                alert("Email obrigatório");
                return;

            case !senha:
                alert("Senha obrigatória");
                return;
        }

        try {
            await authLogin({
                email,
                senha
            });

            setEmail("");
            setSenha("");

            alert("Usuário logado");
        } catch (error) {
            console.error(error);
            alert("Email ou senha incorretos");
        }
    }

    return(
        <div className='conateiner_formulario_login'>
            <p className='email_login'>E-mail</p>

            <div className='conteiner_input_email_login'>
                <MdOutlineEmail className='icone_email_login'/>

                <input type="text" className='input_email_login' placeholder='voce@email.com'
                    value={email}

                    onChange={(event) => setEmail(event.target.value)}
                />
            </div>

                <br />

            <p className='senha_login'>Senha</p>

            <div className='conteiner_input_senha_login'>
                <HiOutlineLockClosed className='icone_senha_login'/>

                <input type={mostrarSenha ? "text" : "password"} className='input_senha_login' placeholder='Sua senha'
                    value={senha}

                    onChange={(event) => setSenha(event.target.value)}
                />

                {
                    mostrarSenha ? 
                    <HiOutlineEyeSlash className='olho_senha_login' onClick={() => setMostrarSenha(!mostrarSenha)}/> 
                    : 
                    <HiOutlineEye className='olho_senha_login' onClick={() => setMostrarSenha(!mostrarSenha)}/>
                }
            </div>

            <Link to="/esqueceu_senha" className='esqueceu_sua_senha'>
                <p className='esqueceu_senha_login'>Esqueceu sua senha?</p>
            </Link>

                <br />

            <button type='button' className='btn_entrar_login' onClick={() => loginUser()}>
                Entrar
            </button>

                <br />

            <hr />
        </div>
    )
}

export default Auth_Formulario_Login;