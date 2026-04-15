import pino from 'pino';
// Configuração do logger Pino para diferentes ambientes
export const logger = pino({
    // Define o nível de log com base no ambiente
    // Em produção, logamos 'info' e acima. Em desenvolvimento, logamos tudo a partir de 'debug'.
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    // Configura o transporte de log (como os logs são formatados e exibidos)
    transport: process.env.NODE_ENV !== 'production'
        // Em desenvolvimento, usamos 'pino-pretty' para logs coloridos e legíveis
        ? {
            target: 'pino-pretty',
            options: {
                colorize: true, // Habilita cores no output
                translateTime: 'SYS:dd-mm-yyyy HH:MM:ss', // Formata o timestamp
                ignore: 'pid,hostname', // Oculta o ID do processo e o nome do host
            },
        }
        // Em produção, não usamos transporte customizado para manter o formato JSON puro
        : undefined,
});
