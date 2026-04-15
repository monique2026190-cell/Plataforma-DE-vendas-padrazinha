
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logger } from '../logs/app.log';
import { loginComGoogle, buscarPerfil } from '../servicos/servico.autenticacao';
import api from '../servicos/api';

// Tipagem forte para o usuário
type User = {
  id: string;
  email: string;
  name?: string;
  picture?: string;
};

// Interface para o estado de autenticação
interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  login: (credential: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Efeito para restaurar a sessão a partir do token no localStorage ao carregar o app
  useEffect(() => {
    const restaurarSessao = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        logger.info('auth.session.restore.attempt', { hasToken: true });
        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        try {
          const response = await buscarPerfil();
          const loadedUser = response.data.user;
          setToken(storedToken);
          setUser(loadedUser);
          logger.info('auth.session.restore.success', { userId: loadedUser.id, email: loadedUser.email });
        } catch (error) {
          logger.warn('auth.session.restore.invalid_token', { error: 'Token inválido ou expirado' });
          // Limpa o estado e o localStorage se o token for inválido
          localStorage.removeItem('token');
          delete api.defaults.headers.common['Authorization'];
        }
      }
      setLoading(false);
    };

    restaurarSessao();
  }, []); // Executa apenas uma vez na montagem do componente

  // Função de login completa e explícita
  const login = async (credential: string) => {
    setLoading(true);
    logger.info('auth.login.attempt');
    try {
      const response = await loginComGoogle(credential);
      const { token: newToken } = response.data;

      localStorage.setItem('token', newToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

      const profileResponse = await buscarPerfil();
      const loggedInUser = profileResponse.data.user;

      // Define o estado da aplicação
      setToken(newToken);
      setUser(loggedInUser);

      // Log enriquecido após o sucesso
      logger.info('auth.login.success', { userId: loggedInUser.id, email: loggedInUser.email });

    } catch (error: any) {
      logger.error('auth.login.error', { message: error.message, stack: error.stack });
      // Garante que o estado seja limpo em caso de falha
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Função de logout com log enriquecido
  const logout = () => {
    logger.info('auth.logout.success', { userId: user?.id, email: user?.email });
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    navigate('/login');
  };

  const value = {
    token,
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
