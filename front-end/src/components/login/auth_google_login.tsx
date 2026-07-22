import '../../style/login/auth_google_login.css';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { env } from '../../config/env';
import { useState, useEffect } from 'react';
import { authGoogle } from '../../service/authServiceApi';


function Auth_Google_Login(){
    const [token, setToken] = useState<string>("");

    useEffect(() => {
        if(!token) return;

        async function enviarTokenGoogle() {
            try{
                await authGoogle(
                {
                    token
                }
            )

            alert("Login realizado com sucesso");
            }catch(err){
                alert(
                    "Erro de login com o Google"
                );

                console.error("Erro de login com o Google", {
                    error: err
                });
            }
        }

        enviarTokenGoogle();
    }, [token]);

    return(
        <div className='btn_auth_google_login'>
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
                        console.error("Falha no login");
                    }}
                />
            </GoogleOAuthProvider>
        </div>
    )
}

export default Auth_Google_Login;