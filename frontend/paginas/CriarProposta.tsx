
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, CssBaseline, GlobalStyles, CircularProgress, Alert, AppBar, Toolbar, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useCriarCurso } from '../hooks/useCriarCurso';
import Logo from '../componentes/logo';
import SessaoFinanceira from '../componentes/criacao.sessao.config.financeira';
import SessaoMarketing from '../componentes/criacao.sessao.config.marketing';
import SessaoInfoCurso from '../componentes/criacao.sessao.info.curso';
import SessaoAnexoPrevia from '../componentes/criacao.sessao.anexo.previa';
import PreviaGrid from '../componentes/criacao.previa.grid';

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
    text: {
        secondary: 'gray',
    }
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    body1: { fontWeight: 500 },
  },
});

const CriarProposta: React.FC = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [moeda, setMoeda] = useState('BRL');
  const [provedor, setProvedor] = useState('Stripe');
  const [previas, setPrevias] = useState<File[]>([]);
  const { salvarCurso, loading, error } = useCriarCurso();
  const navigate = useNavigate();

  const handlePreviaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPrevias(prev => [...prev, ...Array.from(event.target.files)]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (previas.length === 0 || !moeda || !provedor) {
      alert('Por favor, preencha todos os campos obrigatórios e anexe ao menos uma prévia.');
      return;
    }
    await salvarCurso({ nome, descricao, preco: parseFloat(preco), previa: previas[0], moeda, provedor });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: "#121212" } }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar position="static" sx={{ bgcolor: 'background.paper', boxShadow: 'none', borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <IconButton aria-label="voltar" onClick={() => navigate(-1)} sx={{ color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.3)', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}>
              <ArrowBackIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}><Logo /></Box>
            <Box sx={{ width: 48 }} />
          </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="md" sx={{ flexGrow: 1, mt: 4, mb: 4 }}>
          <Typography component="h1" variant="h4" sx={{ mb: 4 }}>
            Criar Proposta de Curso
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <SessaoAnexoPrevia previa={previas.length > 0 ? previas[0] : null} onPreviaChange={handlePreviaChange} />

            <PreviaGrid files={previas} />
            <Box sx={{ mt: 4 }}>
              <SessaoInfoCurso nome={nome} setNome={setNome} descricao={descricao} setDescricao={setDescricao} />
            </Box>
            <SessaoFinanceira preco={preco} setPreco={setPreco} moeda={moeda} setMoeda={setMoeda} provedor={provedor} setProvedor={setProvedor}/>
            
            <SessaoMarketing />

            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

            <Button type="submit" variant="contained" disabled={loading} sx={{ mt: 3, mb: 2 }}>
              {loading ? <CircularProgress size={24} /> : 'Enviar Proposta'}
            </Button>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default CriarProposta;
