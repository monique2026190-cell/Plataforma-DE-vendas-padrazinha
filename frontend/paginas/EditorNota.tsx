
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  TextField,
  Button,
  CssBaseline,
  GlobalStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ArrowBack as ArrowBackIcon, Save as SaveIcon } from '@mui/icons-material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
});

const EditorNota: React.FC = () => {
  const navigate = useNavigate();
  const [conteudo, setConteudo] = useState('');

  const handleSave = () => {
    // Lógica para salvar a nota (será implementada)
    console.log('Nota salva:', conteudo);
    navigate(-1); // Volta para a página anterior
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: '#121212' } }} />
      <AppBar 
        position="fixed" 
        sx={{
          backgroundColor: 'rgba(30, 30, 30, 0.7)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Editar Nota
          </Typography>
          <Button color="inherit" startIcon={<SaveIcon />} onClick={handleSave}>
            Salvar e Fechar
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ pt: 10, height: '100vh' }}>
        <Box sx={{ height: 'calc(100% - 64px)', display: 'flex', flexDirection: 'column' }}>
          <TextField
            fullWidth
            multiline
            placeholder="Comece a escrever sua nota aqui..."
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
            sx={{
              flexGrow: 1,
              '& .MuiOutlinedInput-root': {
                height: '100%',
                alignItems: 'flex-start',
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              },
              '& .MuiInputBase-input': {
                height: '100% !important',
                overflow: 'auto !important'
              }
            }}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default EditorNota;
