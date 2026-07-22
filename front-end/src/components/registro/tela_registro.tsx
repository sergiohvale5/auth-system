import "../../style/registro/tela_registro.css";
import Auth_Google_Registro from "./auth_google_registro";
import Auth_Formulario_Registro from "./auth_formulario_registro";
import { Link } from "react-router-dom";

function Tela_Registro(){
    return(
        <div className="container_registro">
            <div className='conteiner_titulo_texto_registro'>
                <h2>Crie sua conta</h2>

                <p className='texto_acesse_sua_conta_registro'>Crie sua conta de forma rápida e segura.</p>
            </div>

                <br />

            <Auth_Google_Registro />

                <br />

            <div className='hr_ou_registro'>
                <hr />

                <p>OU</p>

                <hr />
            </div>

                <br />

            <Auth_Formulario_Registro />

                <br />

            <div className='container_login'>
                <p className='sim_conta'>Já possui conta?</p>

                <Link to="/" className='link_login'>
                    <p className='cadastro'>Entrar</p>
                </Link>
            </div>
        </div>
    )
}

export default Tela_Registro;