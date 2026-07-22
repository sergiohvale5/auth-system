import "../../style/redefinir senha/tela_redefinir_senha.css";
import Auth_Formulario_Redefinir_Senha from "./auth_formulario_redefinir_senha";

function Tela_Redefinir_Senha(){
    return(
        <div className="container_principal">
            <div className='conteiner_titulo_texto_redefinir_senha'>
                <h2>Redefinir senha</h2>

                <p className='texto_redefine_sua_senha'>Escolha uma nova senha forte para proteger sua conta.</p>
            </div>

                <br />

            <Auth_Formulario_Redefinir_Senha />
        </div>
    )
}

export default Tela_Redefinir_Senha;