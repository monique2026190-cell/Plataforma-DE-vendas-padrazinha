
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Container, Typography, Box, Paper, CssBaseline, GlobalStyles } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../contexto/contexto.autenticacao';
import { env } from '../config/env'; // Importa a configuração de ambiente

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    primary: {
      main: '#90CAF9',
    },
  },
});

const Login: React.FC = () => {
  const { login } = useAuth();

  // Verifica se a configuração do Google Client ID está presente e não é um placeholder.
  const isGoogleAuthConfigured = env.googleClientId && !env.googleClientId.includes('SEU_GOOGLE_CLIENT_ID');

  const handleSuccess = (credentialResponse: any) => {
    // O token retornado pelo Google é o credentialResponse.credential
    if (credentialResponse.credential) {
      login(credentialResponse.credential);
    }
  };

  const handleError = () => {
    console.error('Login com Google falhou');
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: "#121212", height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' } }} />
      <Container component="main" maxWidth="xs">
        <Paper elevation={6} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Login
          </Typography>
          <Box>
            {isGoogleAuthConfigured ? (
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
                theme="filled_black"
                text="signin_with"
                shape="rectangular"
              />
            ) : (
              <Box sx={{ textAlign: 'center', p: 2, border: '1px dashed grey', borderRadius: 1 }}>
                <Typography variant="body2" color="textSecondary">
                  A autenticação do Google não está configurada.
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Para habilitar o login, defina <code>VITE_GOOGLE_CLIENT_ID</code> no seu arquivo <code>.env</code>.
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
