
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppRoutes from './app.routes';
import ErrorBoundary from './app.error.boundary';

// O conteúdo da aplicação.
const AppContent: React.FC = () => {
  return <AppRoutes />;
};

// Camada de Provedores para uma arquitetura mais limpa e escalável
const AppProviders: React.FC<React.PropsWithChildren> = ({ children }) => (
  <ErrorBoundary>
    <Router>
      {children}
    </Router>
  </ErrorBoundary>
);

const App: React.FC = () => {
  return (
    <AppProviders>
      <AppContent />
    </AppProviders>
  );
};

export default App;
