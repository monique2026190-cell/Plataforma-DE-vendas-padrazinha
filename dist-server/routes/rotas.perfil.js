import { Router } from 'express';
import { updateProfileHandler } from '../controllers/controlador.perfil.js';
// import { verificarAutenticacao } from '../middleware/middleware.autenticacao.js';
const router = Router();
router.put('/profile', updateProfileHandler);
export default router;
