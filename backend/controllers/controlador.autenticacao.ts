
import { Request, Response } from 'express';
import { logger } from '../logs/logger.js'; // 1. Importa o logger
import {
  verifyGoogleToken,
  generateJwt,
} from '../services/servico.autenticacao.js';

export const googleLoginHandler = async (req: Request, res: Response) => {
  const { credential } = req.body;

  if (!credential) {
    logger.warn('auth.google.missing_credential');
    return res.status(400).json({ message: 'Token de credencial não fornecido.' });
  }

  try {
    const googleUser = await verifyGoogleToken(credential);

    if (!googleUser) {
      logger.warn({ credential }, 'auth.google.invalid_token');
      return res.status(401).json({ message: 'Token do Google inválido.' });
    }

    // 2. Log de sucesso na verificação do token
    logger.info({ email: googleUser.email }, 'auth.google.token_verified');

    const token = generateJwt(googleUser);

    // 3. Log de sucesso na geração do JWT
    logger.info({ email: googleUser.email }, 'auth.jwt.generated');

    res.status(200).json({ token });

  } catch (error: any) {
    // 4. Substitui console.error por logger.error
    logger.error(
      { error: { message: error.message, stack: error.stack }, credential },
      'auth.google.login_handler_error'
    );
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};
