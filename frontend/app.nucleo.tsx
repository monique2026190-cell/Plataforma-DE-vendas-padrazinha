
import React from 'react';
import AppRoutes from './app.routes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './contexto/contexto.autenticacao';
import { env } from './config/env';

/**
 * O componente raiz da aplicação.
 *
 * Ele envolve toda a aplicação com os provedores de contexto necessários.
 */
const App: React.FC = () => {
  // Verifica se o ID do cliente Google está presente e não é o valor placeholder.
  const isGoogleAuthConfigured = env.googleClientId && !env.googleClientId.includes('SEU_GOOGLE_CLIENT_ID');

  const AppContent = (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );

  if (isGoogleAuthConfigured) {
    // Se a autenticação do Google estiver configurada, envolve a aplicação com o provider.
    return (
      <GoogleOAuthProvider clientId={env.googleClientId}>
        {AppContent}
      </GoogleOAuthProvider>
    );
  } else {
    // Se não estiver configurado, exibe um aviso no console e carrega a aplicação
    // sem o provider do Google. A funcionalidade de login será desabilitada na página de Login.
    console.warn("AVISO: A autenticação do Google não está configurada. Para habilitar, adicione VITE_GOOGLE_CLIENT_ID ao arquivo .env");
    return AppContent;
  }
};

export default App;
