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
    const [sucesso, setSucesso] = useState<string>("");
    const [alerta, setAlerta] = useState<string>("");
    const [error, setError] = useState<string>("");

    async function loginUser() {
        switch (true) {
            case !email:
                setAlerta("Email obrigatório");
                
                setTimeout(() => {
                    setAlerta("");
                }, 3000);

                return;

            case !senha:
                setAlerta("Senha obrigatória");
                
                setTimeout(() => {
                    setAlerta("");
                }, 3000);

                return;
        }

        try {
            await authLogin({
                email,
                senha
            });

            setEmail("");
            setSenha("");

            setSucesso("Usuário logado");

            setTimeout(() => {
                setSucesso("");
            }, 3000);
        } catch (err) {
            console.error(err);

            setError("Email ou senha incorretos");

            setTimeout(() => {
                setError("");
            }, 3000);

            throw err;
        }
    }

    return(
        <div className='conateiner_formulario_login'>
            {
                sucesso && (
                    <div className='notificacao_sucesso'>
                        {sucesso}
                    </div>
                )
            }

            {
                alerta && (
                    <div className='notificacao_alerta'>
                        {alerta}
                    </div>
                )
            }

            {
                error && (
                    <div className='notificacao_error'>
                        {error}
                    </div>
                )
            }

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