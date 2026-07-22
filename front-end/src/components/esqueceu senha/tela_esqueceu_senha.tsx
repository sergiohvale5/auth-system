import "../../style/esqueceu senha/tela_esqueceu_senha.css";
import Auth_Formulario_Esqueceu_Senha from "./auth_formulario_esqueceu_senha";
import { Link } from "react-router-dom";

function Tela_Esqueceu_Senha(){
    return(
        <div className="conteiner_esqueceu_senha">
            <div className='conteiner_titulo_texto_esqueceu_senha'>
                <h2>Esqueceu sua senha?</h2>

                <p className='texto_infome_email'>Informe seu e-mail e enviaremos um link para você criar uma nova senha.</p>
            </div>

                <br />

            <Auth_Formulario_Esqueceu_Senha />

                <br />

            <div className='container_login'>
                <p className='sim_conta'>Lembrou sua senha?</p>

                <Link to="/" className='link_login'>
                    <p className='cadastro'>Voltar para o login</p>
                </Link>
            </div>
        </div>
    )
}

export default Tela_Esqueceu_Senha;