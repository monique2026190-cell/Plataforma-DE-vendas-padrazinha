import { verifyGoogleToken, generateJwt, } from '../services/servico.autenticacao';
/**
 * Lida com o processo de login do Google.
 * Espera um `credential` no corpo da requisição, que é o token de ID do Google.
 */
export const googleLoginHandler = async (req, res) => {
    const { credential } = req.body;
    if (!credential) {
        return res.status(400).json({ message: 'Token de credencial não fornecido.' });
    }
    try {
        const googleUser = await verifyGoogleToken(credential);
        if (!googleUser) {
            return res.status(401).json({ message: 'Token do Google inválido.' });
        }
        // Aqui, você normalmente procuraria o usuário no seu banco de dados
        // ou criaria um novo usuário se ele não existir.
        // Por enquanto, vamos assumir que o usuário é válido e gerar um JWT.
        // Exemplo de como você poderia encontrar ou criar um usuário:
        // let user = await findUserByProviderId(googleUser.providerId);
        // if (!user) {
        //   user = await createUser(googleUser);
        // }
        const token = generateJwt(googleUser);
        res.status(200).json({ token });
    }
    catch (error) {
        console.error('Erro no handler de login do Google:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
};
