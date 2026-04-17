import './config.js';
import express from 'express';
import path from 'path';
import routes from './routes/rotas.js';
import initDB from './db/init.db.js';

const app = express();

app.use(express.json());
app.use('/api', routes);

const frontendBuildPath = path.resolve(process.cwd(), 'dist');
app.use(express.static(frontendBuildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await initDB();
    console.log('Banco de dados inicializado com sucesso.');

    app.listen(PORT, () => {
      console.log(`Servidor iniciado na porta ${PORT}`);
      console.log(`Frontend disponível em http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('Falha ao iniciar o servidor:', error);
    process.exit(1);
  }
};

startServer();
