import '../../style/login/tela_login.css';
import Auth_Google from './auth_google_login';
import Auth_Formulario from './auth_formulario_login';
import {Link} from "react-router-dom"

function Tela_Login(){
    return(
        <div className='login'>
            <div className='conteiner_titulo_texto_login'>
                <h2>Entre na sua conta</h2>

                <p className='texto_acesse_sua_conta_login'>Acesse sua conta de forma rápida e segura.</p>
            </div>

                <br />

            <Auth_Google />

                <br />

            <div className='hr_ou_login'>
                <hr />

                <p>OU</p>

                <hr />
            </div>

                <br />

            <Auth_Formulario />

                <br />

            <div className='container_cadastro'>
                <p className='nao_conta'>Não possui conta?</p>

                <Link to="/registro" className='link_registro'>
                    <p className='cadastro'>Cadastre-se</p>
                </Link>
            </div>
        </div>
    )
}

export default Tela_Login;