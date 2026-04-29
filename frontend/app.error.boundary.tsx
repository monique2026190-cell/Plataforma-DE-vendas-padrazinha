
import React from 'react';

// O estado agora armazena a instância do erro para exibição em desenvolvimento
interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, State> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  // Captura o erro para atualizar o estado e acionar a UI de fallback
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  // Loga o erro com contexto enriquecido após ele ser capturado
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // logger.error('FRONTEND', 'CRASH', 'Erro inesperado capturado pelo ErrorBoundary', {
    //   message: error.message,
    //   stack: error.stack,
    //   componentStack: info.componentStack,
    //   path: window.location.pathname,
    //   timestamp: new Date().toISOString(),
    // });
    console.error('Erro capturado pelo ErrorBoundary:', error, info);
  }

  // Ação para recarregar a página, um recurso mais drástico
  handleReload = () => {
    window.location.reload();
  };

  // Nova ação que reseta o estado de erro, permitindo uma nova tentativa de renderização
  handleTryAgain = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const isDev = import.meta.env.MODE === 'development';

      return (
        <div style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          backgroundColor: '#121212',
          color: 'white',
          fontFamily: 'Roboto, sans-serif'
        }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            😵 Ocorreu um erro inesperado
          </h2>

          <p style={{ marginBottom: '2rem', fontSize: '1.2rem', color: '#bdbdbd' }}>
            Nossa equipe foi notificada. Tente novamente ou recarregue a página.
          </p>

          {/* Em modo de desenvolvimento, exibe a mensagem de erro para facilitar o debug */}
          {isDev && this.state.error && (
            <pre style={{
              background: '#1e1e1e',
              color: '#ff8a80',
              padding: '1rem',
              borderRadius: '8px',
              maxWidth: '80%',
              overflow: 'auto',
              marginBottom: '2rem',
              textAlign: 'left',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all'
            }}>
              <strong>{this.state.error.name}:</strong> {this.state.error.message}
            </pre>
          )}

          <div style={{ display: 'flex', gap: '1rem' }}>
            {/* Botão primário para a ação mais leve e recomendada */}
            <button 
              onClick={this.handleTryAgain}
              style={{
                padding: '12px 24px',
                fontSize: '1rem',
                cursor: 'pointer',
                backgroundColor: '#90caf9',
                color: '#121212',
                border: 'none',
                borderRadius: '5px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              🔁 Tentar novamente
            </button>
            
            {/* Botão secundário para a ação de último recurso */}
            <button 
              onClick={this.handleReload}
              style={{
                padding: '12px 24px',
                fontSize: '1rem',
                cursor: 'pointer',
                backgroundColor: 'transparent',
                color: '#90caf9',
                border: '1px solid #90caf9',
                borderRadius: '5px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              🔄 Recarregar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
