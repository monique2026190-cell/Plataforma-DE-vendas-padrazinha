import { Router } from 'express';
import { getCursos, criarCurso } from '../controllers/controlador.cursos.js';
import { authMiddleware } from '../middleware/middleware.autenticacao.js';

const router = Router();

/**
 * @swagger
 * /api/cursos:
 *   get:
 *     summary: Retorna todos os cursos
 *     responses:
 *       200:
 *         description: Lista de cursos
 */
router.get('/cursos', authMiddleware, getCursos);

/**
 * @swagger
 * /api/cursos:
 *   post:
 *     summary: Cria um novo curso
 *     responses:
 *       201:
 *         description: Curso criado com sucesso
 */
router.post('/cursos', authMiddleware, criarCurso);

export default router;
