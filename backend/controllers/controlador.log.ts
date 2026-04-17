
import { Request, Response } from 'express';

// Níveis de log válidos
type LogLevel = 'info' | 'warn' | 'error' | 'debug';

const isValidLogLevel = (level: any): level is LogLevel => {
  return typeof level === 'string' && ['info', 'warn', 'error', 'debug'].includes(level);
};

/**
 * Processa um único log enviado pelo frontend.
 */
export const logMessage = (req: Request, res: Response) => {
  const { level, msg, ...rest } = req.body;

  if (!isValidLogLevel(level) || !msg) {
    return res.status(400).send('Payload de log inválido.');
  }

  res.status(200).send('Log recebido');
};

/**
 * Processa um lote (array) de logs enviado pelo frontend.
 */
export const logBatchMessages = (req: Request, res: Response) => {
  const logs = req.body;

  if (!Array.isArray(logs)) {
    return res.status(400).send('Payload de logs deve ser um array.');
  }

  for (const log of logs) {
    const { level, msg, ...rest } = log;
    if (isValidLogLevel(level) && msg) {
        // Adiciona a source e loga usando o logger principal
    } else {
        // Loga uma advertência para o log malformado dentro do lote
    }
  }

  res.status(202).send('Logs recebidos para processamento.'); // 202 Accepted é mais semântico aqui
};

