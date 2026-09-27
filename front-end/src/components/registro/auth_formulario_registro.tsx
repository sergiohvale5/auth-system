import "../../style/registro/auth_formulario_registro.css";
import { CiUser } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { HiOutlineLockClosed } from "react-icons/hi";
import { HiOutlineEye,  HiOutlineEyeSlash } from "react-icons/hi2";
import { useState } from "react";
import type { CredenciaisRegistro } from "../../types/authTipos";
import { authRegistro } from "../../service/authServiceApi";
import { useNavigate } from "react-router-dom";

function Auth_Formulario_Registro(){
    const [nome, setNome] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [ confirmarSenha, setConfirmarSenha ] = useState<string>("");
    const [ mostrarSenha, setMostrarSenha ] = useState<boolean>(false);
    const [ mostrarSenhaConfirmar, setMostrarSenhaConfirmar ] = useState<boolean>(false);
    const [sucesso, setSucesso] = useState<string>("");
    const [alerta, setAlerta] = useState<string>("");
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    const requisitos_senha = {
        tamanho: senha.length >= 8,
        minuscula: /[a-z]/.test(senha),
        maiuscula: /[A-Z]/.test(senha),
        numero: /\d/.test(senha),
        especial: /[^A-Za-z0-9]/.test(senha)
    };

    async function cadastrar(){
        const senhaValida = Object.values(requisitos_senha).every(Boolean);
        const senhaConfirmada = confirmarSenha.includes(senha);

        switch(true){
            case !nome:
                setAlerta("Nome obrigatório");
                
                setTimeout(() => {
                    setAlerta("");
                }, 3000);
            break;

            case !email:
                setAlerta("Email obrigatório");
                
                setTimeout(() => {
                    setAlerta("");
                }, 3000);
            break;

            case !senhaValida:
                setAlerta("Senha inválida");
                
                setTimeout(() => {
                    setAlerta("");
                }, 3000);
            break;

            case !senhaConfirmada:
                setAlerta("A confirmação da senha está incorreta");
                
                setTimeout(() => {
                    setAlerta("");
                }, 3000);
            return;
        }

        try{
            const credenciais: CredenciaisRegistro = {
                nome,
                email,
                senha
            }

            await authRegistro(credenciais);

            setNome("");
            setEmail("");
            setSenha("");
            setConfirmarSenha("");

            setSucesso("Usuário registrado");
            
            setTimeout(() => {
                setSucesso("");

                navigate("/");
            }, 1500);
        }catch(err){
            setError("Erro ao registrar-se");

            setTimeout(() => {
                setError("");
            }, 3000);

            throw err;
        }
    }
    return(
        <div className='conateiner_formulario_registro'>
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

            <p className='nome_registro'>Nome</p>

            <div className='conteiner_input_nome_registro'>
                <CiUser className='icone_usuario_registro'/>

                <input type="text" className='input_nome_registro' placeholder='Seu nome' required
                    value={nome}

                    onChange={(event) => setNome(event.target.value)}
                />
            </div>

                <br />

            <p className='email_registro'>E-mail</p>

            <div className='conteiner_input_email_registro'>
                <MdOutlineEmail className='icone_email_registro'/>

                <input type="email" className='input_email_registro' placeholder='voce@email.com' required
                    value={email}

                    onChange={(event) => setEmail(event.target.value)}
                />
            </div>

                <br />

            <p className='senha_registro'>Senha</p>

            <div className='conteiner_input_senha_registro'>
                <HiOutlineLockClosed className='icone_senha_registro'/>

                <input type={mostrarSenha ? "text" : "password"} className='input_senha_registro' placeholder='Sua senha' required
                    value={senha}

                    onChange={(event) => setSenha(event.target.value)}
                />

                {mostrarSenha ? 
                    <HiOutlineEyeSlash className='olho_senha_registro' onClick={() => setMostrarSenha(!mostrarSenha)}/> 
                    : 
                    <HiOutlineEye className='olho_senha_registro' onClick={() => setMostrarSenha(!mostrarSenha)}/>
                }
            </div>

            <div className="dashboard_senha">
                <div className="conteiner_forca_senha">
                    <span className="forca_senha">A senha deve possuir</span>
                </div>

                <div className="condicoes_senha">
                    <span className={requisitos_senha.tamanho ? "ok" : "min_8"}>✕ Mínimo de 8 caracteres</span>
                    <span className={requisitos_senha.minuscula ? "ok" : "uma_letra_minuscula"}>✕ 1 letra minúscula</span>
                    <span className={requisitos_senha.maiuscula ? "ok" : "uma_letra_maiuscula"}>✕ 1 letra maiúscula</span>
                    <span className={requisitos_senha.numero ? "ok" : "um_numero"}>✕ 1 número</span>
                    <span className={requisitos_senha.especial ? "ok" : "um_caractere_especial"}>✕ 1 caractere especial</span>
                </div>
            </div>

                <br />

            <p className='confirmar_senha'>Confirmar senha</p>

            <div className='conteiner_input_senha_confirmar'>
                <HiOutlineLockClosed className='icone_senha_confirmar'/>

                <input type={mostrarSenhaConfirmar ? "text" : "password"} className='input_senha_confirmar' placeholder='Repita a senha' required
                    value={confirmarSenha}

                    onChange={(event) => setConfirmarSenha(event.target.value)}
                />

                {
                    mostrarSenhaConfirmar ?
                    <HiOutlineEyeSlash className='olho_senha_confirmar' onClick={() => setMostrarSenhaConfirmar(!mostrarSenhaConfirmar)} />
                    :                    
                    <HiOutlineEye className='olho_senha_confirmar' onClick={() => setMostrarSenhaConfirmar(!mostrarSenhaConfirmar)} />
                }
            </div>

                <br />

            <button type='button' className='btn_cadastrar_registro' onClick={cadastrar}>Cadastrar</button>

                <br />

            <hr />
        </div>
    )
}

export default Auth_Formulario_Registro;