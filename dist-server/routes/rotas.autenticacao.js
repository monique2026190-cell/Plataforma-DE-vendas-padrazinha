import { Router } from 'express';
import { googleLoginHandler } from '../controllers/controlador.autenticacao';
const router = Router();
/**
 * @swagger
 * /auth/google:
 *   post:
 *     summary: Autentica um usuário usando o token de ID do Google.
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - credential
 *             properties:
 *               credential:
 *                 type: string
 *                 description: O token de ID JWT do Google obtido no login do lado do cliente.
 *     responses:
 *       200:
 *         description: Login bem-sucedido. Retorna um token JWT para a sessão do usuário.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticação em rotas protegidas.
 *       400:
 *         description: O token de credencial não foi fornecido.
 *       401:
 *         description: Token do Google inválido ou expirado.
 *       500:
 *         description: Erro interno do servidor.
 */
router.post('/google', googleLoginHandler);
export default router;
