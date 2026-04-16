
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography, 
  Container, 
  Box, 
  CssBaseline, 
  GlobalStyles,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  IconButton,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  NoteAdd as NoteAddIcon,
  AttachFile as AttachFileIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import Cabecalho from '../componentes/Cabecalho';
import ModalAdicionarArquivo from '../componentes/ModalAdicionarArquivo';
import ListaNotas from '../componentes/ListaNotas';
import ListaArquivos from '../componentes/ListaArquivos';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
});

// Interfaces para os tipos de dados
interface Nota {
  id: string;
  conteudo: string;
  criadoEm: Date;
}

interface Arquivo {
  id: string;
  nome: string;
  url: string;
  criadoEm: Date;
}

const Aula: React.FC = () => {
  const { cursoId, aulaId } = useParams<{ cursoId: string, aulaId: string }>();
  const navigate = useNavigate();
  const [arquivoModalOpen, setArquivoModalOpen] = useState(false);

  // Estados para armazenar as notas e arquivos (manteremos por enquanto)
  const [notas, setNotas] = useState<Nota[]>([]);
  const [arquivos, setArquivos] = useState<Arquivo[]>([]);

  // A função de salvar nota será movida para a página do editor,
  // mas a lógica para atualizar a lista localmente pode ficar aqui no futuro.

  const handleUploadArquivo = (arquivo: File) => {
    const novoArquivo: Arquivo = {
      id: `arquivo-${Date.now()}`,
      nome: arquivo.name,
      url: URL.createObjectURL(arquivo), // Cria uma URL local para o arquivo
      criadoEm: new Date(),
    };
    setArquivos(prevArquivos => [...prevArquivos, novoArquivo]);
    setArquivoModalOpen(false); // Fecha o modal após o upload
  };

  const actions = [
    { 
      icon: <NoteAddIcon />, 
      name: 'Criar nota', 
      action: () => navigate(`/curso/${cursoId}/aula/${aulaId}/nova-nota`) // Navega para a página de edição
    },
    { icon: <AttachFileIcon />, name: 'Adicionar arquivo', action: () => setArquivoModalOpen(true) },
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: "#121212" } }} />
      <Cabecalho />

      <IconButton
        aria-label="back"
        onClick={() => navigate(-1)}
        sx={{
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 1300,
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Container component="main" sx={{ mt: 10, flexGrow: 1, pb: 12 }}>

        <Typography variant="h4" component="h1" gutterBottom>
          Aula: Bem-vindo ao Módulo
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          ID da Pasta: {aulaId} (Curso: {cursoId})
        </Typography>
        
        <Box sx={{ my: 4, p: 3, bgcolor: '#1E1E1E', borderRadius: 2 }}>
          <Typography sx={{color: 'text.secondary'}}>
            O conteúdo principal da aula (vídeo, texto, etc.) aparecerá aqui.
          </Typography>

          <ListaNotas notas={notas} />
          <ListaArquivos arquivos={arquivos} />
        </Box>

      </Container>
      
      <SpeedDial
        ariaLabel="SpeedDial para adicionar conteúdo"
        sx={{ position: 'fixed', bottom: 32, right: 32 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={action.action}
          />
        ))}
      </SpeedDial>

      {/* O ModalCriarNota foi removido */}

      <ModalAdicionarArquivo 
        open={arquivoModalOpen} 
        onClose={() => setArquivoModalOpen(false)} 
        onUpload={handleUploadArquivo} 
      />
      
    </ThemeProvider>
  );
};

export default Aula;
