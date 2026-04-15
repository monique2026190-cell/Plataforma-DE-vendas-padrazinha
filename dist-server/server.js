import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/rotas.autenticacao'; // Importa as rotas de autenticação
import { authMiddleware } from './middleware/middleware.autenticacao'; // Importa o middleware de autenticação
const app = express();
// --- Middlewares Essenciais ---
// Adiciona o middleware para parse de JSON no corpo das requisições.
// Deve vir antes do registro das rotas que o utilizam.
app.use(express.json());
// Correção do __dirname (ESSENCIAL)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// --- Rotas da API ---
// Registra as rotas de autenticação sob o prefixo /api/auth
app.use('/api/auth', authRoutes);
// Exemplo de uma rota protegida
// Esta rota só será acessível se um token JWT válido for fornecido.
app.get('/api/profile', authMiddleware, (req, res) => {
    // Graças ao middleware, temos acesso a req.user com os dados do usuário
    res.json({
        message: 'Esta é uma rota protegida.',
        user: req.user,
    });
});
// --- Servir Arquivos Estáticos (Frontend) ---
// Caminho correto da build
const distPath = path.join(__dirname, '../dist');
// Servir arquivos estáticos da pasta dist
app.use(express.static(distPath));
// SPA fallback - DEVE ser registrado DEPOIS das rotas da API
// Qualquer requisição que não corresponda a uma rota da API ou a um arquivo estático
// será redirecionada para o index.html do frontend.
app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});
// --- Inicialização do Servidor ---
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
