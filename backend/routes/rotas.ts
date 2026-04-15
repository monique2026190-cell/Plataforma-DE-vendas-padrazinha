import { Router } from 'express';
import authRoutes from './rotas.autenticacao.js';
import logRoutes from './rotas.log.js';
import courseRoutes from './rotas.cursos.js';

const router = Router();

router.use('/auth', authRoutes);
router.use(logRoutes);
router.use(courseRoutes);

export default router;
