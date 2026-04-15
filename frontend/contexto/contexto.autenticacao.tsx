
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define a interface para o estado de autenticação
interface AuthState {
  token: string | null;
  user: any; // Pode ser substituído por uma interface de usuário mais específica
  login: (credential: string) => Promise<void>;
  logout: () => void;
}

// Cria o contexto de autenticação com um valor padrão undefined
const AuthContext = createContext<AuthState | undefined>(undefined);

// Hook customizado para usar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

// Componente Provedor que envolve a aplicação
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<any>(null); // Dados do usuário podem ser carregados do token/API

  // Função para realizar o login
  const login = async (credential: string) => {
    try {
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential }),
      });

      if (!response.ok) {
        throw new Error('Falha na autenticação com o backend');
      }

      const { token: newToken } = await response.json();
      setToken(newToken);
      localStorage.setItem('token', newToken);

      // Opcional: decodificar o token para obter dados do usuário e armazená-los no estado
      // const decodedUser = jwt_decode(newToken); // Usando uma biblioteca como jwt-decode
      // setUser(decodedUser);

    } catch (error) {
      console.error("Erro no processo de login:", error);
      // Limpa o estado em caso de erro
      setToken(null);
      localStorage.removeItem('token');
      setUser(null);
      throw error; // Propaga o erro para o chamador lidar com a UI
    }
  };

  // Função para realizar o logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    // Redireciona para a página de login ou inicial
    window.location.href = '/login';
  };

  const value = {
    token,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
