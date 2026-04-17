
import { Request, Response } from 'express';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { findOrCreateUser } from '../repository/repositorio.usuario.js';
import { logger } from '../logs/logger.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLoginHandler = async (req: Request, res: Response) => {
  const { credential } = req.body;

  if (!credential) {
    logger.warn('Credential token not provided.');
    return res.status(400).json({ message: 'Credential token not provided.' });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    if (!payload || !payload.sub || !payload.email) {
      logger.warn('Invalid Google token payload.');
      return res.status(401).json({ message: 'Invalid Google token.' });
    }

    // Utiliza a função findOrCreateUser do repositório
    const user = await findOrCreateUser(payload as TokenPayload & { sub: string; email: string; name: string; picture?: string });

    // Cria um JWT para a sessão da aplicação
    const appJwt = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    logger.info({ userId: user.id }, 'User authenticated successfully.');
    res.status(200).json({ token: appJwt });

  } catch (error) {
    logger.error({ error }, 'Error during Google login');
    res.status(500).json({ message: 'Internal server error during Google login.' });
  }
};
