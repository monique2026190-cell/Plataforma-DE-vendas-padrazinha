
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexto/contexto.autenticacao';

/**
 * Um componente que renderiza o conteúdo da rota (via <Outlet />)
 * se o usuário estiver autenticado (ou seja, se houver um token).
 * Caso contrário, redireciona o usuário para a página de login.
 */
const RotaProtegida: React.FC = () => {
  const { token } = useAuth();

  // Se não houver token, redireciona para a página de login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Se houver um token, renderiza o componente filho da rota
  return <Outlet />;
};

export default RotaProtegida;
