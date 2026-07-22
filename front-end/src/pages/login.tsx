import Tela_Login from "../components/login/tela_login";
import Tela_Registro from "../components/registro/tela_registro";
import Tela_Esqueceu_Senha from "../components/esqueceu senha/tela_esqueceu_senha";
import Tela_Redefinir_Senha from "../components/redefinir senha/tela_redefinir_senha";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function Login(){
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Tela_Login />}/>

                    <Route path="/registro" element={<Tela_Registro />}/>

                    <Route path="/esqueceu_senha" element={< Tela_Esqueceu_Senha />} />

                    <Route path="/redefinir_senha" element={<Tela_Redefinir_Senha />}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Login;