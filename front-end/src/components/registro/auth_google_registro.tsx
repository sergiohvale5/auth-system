import '../../style/registro/auth_google_registro.css';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { env } from '../../config/env';
import { useState, useEffect } from 'react';
import { authGoogle } from '../../service/authServiceApi';
import { useNavigate } from 'react-router-dom';

function Auth_Google_Registro(){
    const [token, setToken] = useState<string>("");
    const [sucesso, setSucesso] = useState<string>("");
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    useEffect(() => {
        if(!token) return;

        async function enviarTokenGoogle() {
            try{
                await authGoogle(
                    {
                        token
                    }
                )

                setSucesso("Cadastro realizado com sucesso")
                
                setTimeout(() => {
                    setSucesso("");

                    navigate("/");
                }, 1500);
            }catch(err){
                setError("Erro de cadastro com o Google");

                setTimeout(() => {
                    setError("");
                }, 3000);

                console.error("Erro de cadastro com o Google", {
                    error: err
                });
            }
        }

        enviarTokenGoogle();
    }, [token, navigate]);

    return(
        <div className='btn_auth_google_registro'>
            {
                sucesso && (
                    <div className='notificacao_sucesso'>
                        {sucesso}
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

            <GoogleOAuthProvider clientId={env.cliente_id_google}>
                <GoogleLogin 
                    text='signup_with'
                    theme="outline"
                    size="large"
                    shape="rectangular"
                    width="342"

                    onSuccess={response => {
                        setToken(
                            response.credential ?? ""
                        );
                    }}

                    onError={() => {
                        console.log("Falha no login");
                    }}
                />
            </GoogleOAuthProvider>
        </div>
    )
}

export default Auth_Google_Registro;