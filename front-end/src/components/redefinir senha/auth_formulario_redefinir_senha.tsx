import "../../style/redefinir senha/auth_formulario_redefinir_senha.css";
import { HiOutlineLockClosed } from "react-icons/hi";
import { HiOutlineEye,  HiOutlineEyeSlash } from "react-icons/hi2";
import { useState } from "react";
import { redefinir_senha } from "../../service/authServiceApi";
import { dadosUser } from "../../service/authServiceApi";
import { useNavigate } from "react-router-dom";

function Auth_Formulario_Redefinir_Senha(){
    const [senha, setSenha] = useState<string>("");
    const [ confirmarSenha, setConfirmarSenha ] = useState<string>("");
    const [ mostrarSenha, setMostrarSenha ] = useState<boolean>(false);
    const [ mostrarSenhaConfirmar, setMostrarSenhaConfirmar ] = useState<boolean>(false);
    const [sucesso, setSucesso] = useState<string>("");
    const [alerta, setAlerta] = useState<string>("");
    const [error, setError] = useState<string>("");

    const requisitos_senha = {
        tamanho: senha.length >= 8,
        minuscula: /[a-z]/.test(senha),
        maiuscula: /[A-Z]/.test(senha),
        numero: /\d/.test(senha),
        especial: /[^A-Za-z0-9]/.test(senha)
    };

    const navegate = useNavigate();

    const email = localStorage.getItem("emailRecuperação");

    async function userDados() {
        try{
            if (!email) {
                setAlerta("Erro ao atualizar senha");

                setTimeout(() => {
                    setAlerta("");
                }, 3000);

                throw new Error("E-mail não encontrado no localStorage.");
            }

            return await dadosUser({email})
        }catch(err){
            setError("Erro ao redefinir senha");

            setTimeout(() => {
                setError("");
            }, 3000);

            throw err;
        }
    }

    async function redefinirSenha(id: number) {
        switch(true){
            case !senha:
                setAlerta("Preenchimento do campo obrigatório");

                setTimeout(() => {
                    setAlerta("");
                }, 3000);

                return

            case !confirmarSenha:
                setAlerta("Preenchimento do campo obrigatório");

                setTimeout(() => {
                    setAlerta("");
                }, 3000);

                return
        }

        try{
            await redefinir_senha(
                {
                    senha
                },

                id
            )

            setSenha("");
            setConfirmarSenha("");

            setSucesso("Senha atualizada");

            setTimeout(() => {
                setSucesso("");

                navegate("/");
            }, 1500);
        }catch(err){
            setError("Erro ao atualizar senha");

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

            <p className='nova_senha'>Nova senha</p>

            <div className='conteiner_input_nova_senha'>
                <HiOutlineLockClosed className='icone_nova_senha'/>

                <input type={mostrarSenha ? "text" : "password"} className='input_nova_senha' placeholder='Sua senha' required
                    value={senha}

                    onChange={(event) => setSenha(event.target.value)}
                />

                {mostrarSenha ? 
                    <HiOutlineEyeSlash className='olho_nova_senha' onClick={() => setMostrarSenha(!mostrarSenha)}/> 
                    : 
                    <HiOutlineEye className='olho_nova_senha' onClick={() => setMostrarSenha(!mostrarSenha)}/>
                }
            </div>

            <div className="dashboard_redefirnir_senha">
                <div className="conteiner_forca_redefinir_senha">
                    <span className="forca_redefinir_senha">A senha deve possuir</span>
                </div>

                <div className="condicoes_redefinir_senha">
                    <span className={requisitos_senha.tamanho ? "ok" : "min_8"}>✕ Mínimo de 8 caracteres</span>
                    <span className={requisitos_senha.minuscula ? "ok" : "uma_letra_minuscula"}>✕ 1 letra minúscula</span>
                    <span className={requisitos_senha.maiuscula ? "ok" : "uma_letra_maiuscula"}>✕ 1 letra maiúscula</span>
                    <span className={requisitos_senha.numero ? "ok" : "um_numero"}>✕ 1 número</span>
                    <span className={requisitos_senha.especial ? "ok" : "um_caractere_especial"}>✕ 1 caractere especial</span>
                </div>
            </div>

                <br />

            <p className='confirmar_redefinicao_senha'>Confirmar nova senha</p>

            <div className='conteiner_input_redefinicao_senha'>
                <HiOutlineLockClosed className='icone_redefinicao_senha'/>

                <input type={mostrarSenhaConfirmar ? "text" : "password"} className='input_redefinicao_senha' placeholder='Repita a senha' required
                    value={confirmarSenha}

                    onChange={(event) => setConfirmarSenha(event.target.value)}
                />

                {
                    mostrarSenhaConfirmar ?
                    <HiOutlineEyeSlash className='olho_redefinicao_senha' onClick={() => setMostrarSenhaConfirmar(!mostrarSenhaConfirmar)} />
                    :                    
                    <HiOutlineEye className='olho_redefinicao_senha' onClick={() => setMostrarSenhaConfirmar(!mostrarSenhaConfirmar)} />
                }
            </div>

                <br />

            <button type='button' className='btn_redefinir_senha' onClick={async() => {
                const id = await userDados();

                await redefinirSenha(id);
            }}>
                Redefinir senha
            </button>
        </>
    )
}

export default Auth_Formulario_Redefinir_Senha;