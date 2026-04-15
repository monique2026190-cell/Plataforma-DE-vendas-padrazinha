import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
// Correção do __dirname (ESSENCIAL)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Caminho correto da build
const distPath = path.join(__dirname, "../dist");
// Servir arquivos estáticos
app.use(express.static(distPath));
// SPA fallback
app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
});
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
