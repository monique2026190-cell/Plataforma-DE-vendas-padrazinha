
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Box, Container, CssBaseline, GlobalStyles, Card } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import CardMetodosPagamento from '../componentes/card.metodos.pagamento';
import CarrosselImagens from '../componentes/CarrosselImagens';
import DescricaoCursoCard from '../componentes/DescricaoCursoCard';
import BotaoComprar from '../componentes/BotaoComprar';
import Logo from '../componentes/logo';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    primary: {
      main: '#BB86FC',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
});

const CursoPreview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const curso = {
    nome: 'Curso de Exemplo',
    descricao: 'Esta é uma descrição de exemplo para o curso. Aprenda tudo sobre este tópico incrível com nosso curso abrangente.',
    imagemUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    preco: 'R$ 99,90'
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: darkTheme.palette.background.default } }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
        <AppBar position="static" sx={{ bgcolor: 'background.paper', boxShadow: 'none', borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <IconButton 
              aria-label="voltar" 
              onClick={() => navigate(-1)}
              sx={{
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                <Logo />
            </Box>
            <Box sx={{ width: 48 }} /> 
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" sx={{ flexGrow: 1, mt: 4, mb: 4 }}>
          
          {/* Seção do Carrossel */}
          <Card sx={{ mb: 3, borderRadius: '12px', overflow: 'hidden' }}>
            <CarrosselImagens imagemUrl={curso.imagemUrl} nomeCurso={curso.nome} />
          </Card>

          {/* Seção da Descrição */}
          <Card sx={{ mb: 3, borderRadius: '12px' }}>
            <DescricaoCursoCard nome={curso.nome} descricao={curso.descricao} preco={curso.preco} />
          </Card>

          {/* Seção do Botão de Compra */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <BotaoComprar onClick={handleOpenModal} />
          </Box>

        </Container>
        
      </Box>
      <CardMetodosPagamento open={modalOpen} onClose={handleCloseModal} />
    </ThemeProvider>
  );
};

export default CursoPreview;
