import { 
    Router 
} from "express";

import { 
    validacaoDadosCadastraisUsers, 
    validacaoDadosLoginUsers, 
    validarTokenAuth, 
    validacaoDadosRedefinirSenha, 
    validacaoDadosAtualizarSenha,
    validarToken
} from "../middleware/usersMiddleware";

import { 
    postRegistroUsersController, 
    postLoginUsersController, 
    postRedefinirSenhaController, 
    postDadosUserController, 
    putAtualizacaoSenhaController,
    postAuthGoogleController
} from "../controller/usersController";

const router = Router();

router.post('/registro', validacaoDadosCadastraisUsers, postRegistroUsersController);
router.post('/login', validacaoDadosLoginUsers, postLoginUsersController);
router.post('/redefinir_senha', validacaoDadosRedefinirSenha, postRedefinirSenhaController);
router.post('/dados_user', validacaoDadosRedefinirSenha, postDadosUserController);
router.put('/atualizar_senha/:id', validacaoDadosAtualizarSenha, putAtualizacaoSenhaController);
router.post('/auth/google', validarToken, postAuthGoogleController);

export default router;