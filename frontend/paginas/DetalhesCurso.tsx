import React from 'react';
import { Card, CardContent, Typography, Container, Button, CardMedia, CssBaseline, GlobalStyles, CircularProgress, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cabecalho from '../componentes/Cabecalho';
import DescricaoCursoCard from '../componentes/DescricaoCursoCard';
import { useDetalhesCurso } from '../hooks/useDetalhesCurso';

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
});

const DetalhesCurso: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { curso, loading, error } = useDetalhesCurso(id);

  const handleComprar = () => {
    // Lógica de compra
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: '#121212', display: 'flex', flexDirection: 'column', minHeight: '100vh' } }} />
      <Cabecalho />
      <Container component="main" sx={{ mt: 10, mb: 4, flexGrow: 1 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography sx={{ textAlign: 'center', mt: 4, color: 'error.main' }}>
            Erro ao carregar o curso. Tente novamente mais tarde.
          </Typography>
        ) : !curso ? (
          <Typography sx={{ textAlign: 'center', mt: 4 }}>
            Curso não encontrado.
          </Typography>
        ) : (
          <>
            <Card sx={{ bgcolor: 'background.paper', mb: 4 }}>
              {curso.capa_curso && (
                <CardMedia
                  component="img"
                  height="300"
                  image={curso.capa_curso}
                  alt={`Imagem do ${curso.nome}`}
                />
              )}
              <CardContent>
                <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
                  {curso.nome}
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                  R$ {curso.preco?.toFixed(2)}
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleComprar}>
                  Comprar Agora
                </Button>
              </CardContent>
            </Card>
            {curso.descricao && <DescricaoCursoCard descricao={curso.descricao} />}
          </>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default DetalhesCurso;
