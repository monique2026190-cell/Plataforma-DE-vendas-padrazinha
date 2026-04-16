
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
  SelectChangeEvent,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ArrowBack as ArrowBackIcon, Save as SaveIcon } from '@mui/icons-material';
import CardEdicaoNota from '../componentes/CardEdicaoNota';

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
  const [formats, setFormats] = useState<string[]>(() => []);
  const [font, setFont] = useState('Roboto');
  const [color, setColor] = useState('#ffffff');

  const handleFormat = (event: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
    setFormats(newFormats);
  };

  const handleFontChange = (event: SelectChangeEvent) => {
    setFont(event.target.value as string);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  const handleSave = () => {
    // Lógica para salvar a nota (será implementada)
    console.log('Nota salva:', { conteudo, formats, font, color });
    navigate(-1); // Volta para a página anterior
  };

  const handleCancel = () => {
    navigate(-1); // Volta para a página anterior
  };

  const getTextareaStyle = () => ({
    fontWeight: formats.includes('bold') ? 'bold' : 'normal',
    fontStyle: formats.includes('italic') ? 'italic' : 'normal',
    textDecoration: formats.includes('underlined') ? 'underline' : 'none',
    fontFamily: font,
    color: color,
    height: '100% !important',
    overflow: 'auto !important',
  });

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
            onClick={handleCancel}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Editar Nota
          </Typography>
          <Button color="inherit" startIcon={<SaveIcon />} onClick={handleSave}>
            Salvar
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ pt: 10, height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <CardEdicaoNota 
          formats={formats} 
          onFormatChange={handleFormat} 
          font={font}
          onFontChange={handleFontChange}
          color={color}
          onColorChange={handleColorChange}
        />
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', bgcolor: '#1E1E1E', borderRadius: 1, p: 2, mt: 1 }}>
          <TextField
            fullWidth
            multiline
            variant="standard"
            placeholder="Comece a escrever sua nota aqui..."
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
            sx={{
              flexGrow: 1,
              border: 'none',
              '& .MuiInput-underline:before': { borderBottom: 0 },
              '& .MuiInput-underline:after': { borderBottom: 0 },
            }}
            InputProps={{
              disableUnderline: true,
              style: getTextareaStyle(),
            }}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default EditorNota;
