
import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, CssBaseline, GlobalStyles, IconButton, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../componentes/Footer';
import CardInformacaoPerfil from '../componentes/card.informacoes.perfil';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import Cabecalho from '../componentes/Cabecalho';
import { useAuth } from '../contexto/contexto.autenticacao';

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

// Definindo uma interface para os dados do perfil do usuário
interface UserProfile {
  name: string;
  email: string;
}

const MeuPerfil: React.FC = () => {
  const navigate = useNavigate();
  const { token, logout } = useAuth(); // Obtém o token e a função de logout do contexto
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setError("Autenticação necessária.");
        return;
      }

      try {
        const response = await fetch('/api/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Falha ao buscar dados do perfil. Token inválido ou expirado.');
        }

        const data = await response.json();
        setProfile(data.user);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
        if (err.message.includes('Token')) {
            logout();
        }
      }
    };

    fetchProfile();
  }, [token, logout]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: "#121212" } }} />
      <Cabecalho />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Container sx={{ mt: 10, mb: 8, flexGrow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" gutterBottom>Meu Perfil</Typography>
            <div>
                <IconButton color="primary" onClick={() => navigate('/configuracoes-app')} sx={{ mr: 1 }}>
                    <SettingsIcon />
                </IconButton>
                <Button 
                    variant="outlined" 
                    color="primary" 
                    startIcon={<LogoutIcon />}
                    onClick={logout}
                >
                    Logout
                </Button>
            </div>
          </Box>
          {error && <Typography color="error">Erro: {error}</Typography>}
          {profile ? (
            <CardInformacaoPerfil nome={profile.name} />
          ) : (
            !error && <Typography>Carregando perfil...</Typography>
          )}
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default MeuPerfil;
