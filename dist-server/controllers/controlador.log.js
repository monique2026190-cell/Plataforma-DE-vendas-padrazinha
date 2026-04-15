import { logger } from '../logs/logger.js';
// Validador simples para garantir que o nível é um dos esperados
const isValidLogLevel = (level) => {
    return ['info', 'warn', 'error', 'debug'].includes(level);
};
export const logMessage = (req, res) => {
    const { level, message, ...rest } = req.body;
    // Validação básica do payload
    if (!level || !message || !isValidLogLevel(level)) {
        // Loga uma advertência se o payload do log do frontend for malformado
        logger.warn({ body: req.body, source: 'frontend-log-endpoint' }, 'Payload de log inválido ou ausente recebido');
        return res.status(400).send('Payload de log inválido.');
    }
    // Cria o objeto de log final, adicionando o contexto crucial
    const logObject = {
        ...rest,
        source: 'frontend', // Identifica a origem do log
    };
    // Usa o nível de log dinamicamente para chamar a função apropriada do Pino
    // ex: logger.info(), logger.warn(), etc.
    logger[level](logObject, message);
    res.status(200).send('Log recebido');
};
