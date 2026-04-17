
import { Request, Response } from 'express';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { findOrCreateUser } from '../repository/repositorio.usuario.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLoginHandler = async (req: Request, res: Response) => {
  const { credential } = req.body;

  if (!credential) {
    return res.status(400).json({ message: 'Credential token not provided.' });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    if (!payload || !payload.sub || !payload.email) {
      return res.status(401).json({ message: 'Invalid Google token.' });
    }

    const user = await findOrCreateUser(payload as TokenPayload & { sub: string; email: string; name: string; picture?: string });

    const appJwt = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.status(200).json({ 
      token: appJwt,
      perfilCompleto: user.perfil_completo,
      user: {
        id: user.id,
        email: user.email,
        nome: user.nome,
        foto_perfil: user.foto_perfil,
      }
     });

  } catch (error) {
    res.status(500).json({ message: 'Internal server error during Google login.' });
  }
};

export const meHandler = (req: Request, res: Response) => {
  // O middleware verificarAutenticacao já validou o token e anexou os dados do usuário a req.user
  // @ts-ignore
  if (req.user) {
    // @ts-ignore
    res.status(200).json(req.user);
  } else {
    res.status(404).json({ message: 'User not found.' });
  }
};
