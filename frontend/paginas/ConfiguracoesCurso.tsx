
import React from 'react';
import {
  CssBaseline, GlobalStyles, ThemeProvider, createTheme, Box, AppBar, Toolbar, IconButton, Typography,
  Container
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { GeralSection } from './curso.sessao.geral';
import { ConteudoSection } from './curso.sessao.conteudo';
import { AcessoPublicacaoSection } from './curso.sessao.acessoepublicacao';
import { ZonaPerigoSection } from './curso.sessao.zonadeperigo';


// O mesmo tema escuro e sofisticado da página de cursos
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    primary: {
      main: '#5E97F6', // Um azul mais sóbrio e profissional
    },
    text: {
      primary: '#EAEAEA',
      secondary: '#A9A9A9',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h6: {
      fontWeight: 600,
    },
    body1: {
      fontWeight: 500,
    },
  },
});


export const ConfiguracoesCurso: React.FC = () => {
    const navigate = useNavigate();
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: darkTheme.palette.background.default } }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <AppBar position="static" sx={{ bgcolor: 'background.paper', boxShadow: 'none', borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
          <Toolbar>
            <IconButton 
              aria-label="voltar" 
              onClick={() => navigate(-1)}
              sx={{
                marginRight: '10px',
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Configurações do Curso
            </Typography>
          </Toolbar>
        </AppBar>

        <Container component="main" maxWidth="md" sx={{ flexGrow: 1, overflowY: 'auto', py: 3 }}>
         <GeralSection />
         <ConteudoSection />
         <AcessoPublicacaoSection />
         <ZonaPerigoSection />
        </Container>
      </Box>
    </ThemeProvider>
  );
};
