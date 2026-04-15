import { Router } from 'express';
import authRoutes from './rotas.autenticacao.js';
import logRoutes from './rotas.log.js';
const router = Router();
router.use('/auth', authRoutes);
router.use(logRoutes);
export default router;
