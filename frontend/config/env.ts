
// Arquivo: frontend/config/env.ts

/**
 * Este objeto centraliza o acesso a todas as variáveis de ambiente
 * da aplicação frontend, garantindo um ponto único de configuração.
 *
 * O Vite, por padrão, só expõe para o cliente as variáveis que começam
 * com o prefixo `VITE_`. Esta é uma medida de segurança para evitar o
 * vazamento acidental de chaves sensíveis.
 *
 * Acessamos as variáveis através de `import.meta.env`.
 */
export const env = {
  /**
   * O ID de Cliente do Google usado para o fluxo de autenticação OAuth.
   * Este valor é obtido do arquivo `.env` na raiz do frontend.
   */
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
};
