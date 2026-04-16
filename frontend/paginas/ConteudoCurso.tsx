import React, { useState } from 'react';
import {
  Typography, 
  Container, 
  Box, 
  CssBaseline, 
  GlobalStyles, 
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import BotaoConfiguracoesCurso from '../componentes/BotaoConfiguracoesCurso';
import BotaoCriarSecao from '../componentes/BotaoCriarSecao';
import Cabecalho from '../componentes/Cabecalho';
import SecaoConteudo from '../componentes/SecaoConteudo';
import ModalCriarSecao from '../componentes/ModalCriarSecao';
import ModalCriarPasta from '../componentes/ModalCriarPasta';
import ModalEditarPasta from '../componentes/ModalEditarPasta';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
});

interface EditingFolderInfo {
  sectionId: number;
  folderId: number;
  currentName: string;
}

const ConteudoCurso: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [secaoModalOpen, setSecaoModalOpen] = useState(false);
  const [pastaModalOpen, setPastaModalOpen] = useState(false);
  const [editPastaModalOpen, setEditPastaModalOpen] = useState(false);
  const [editingFolder, setEditingFolder] = useState<EditingFolderInfo | null>(null);
  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(null);

  const [secoes, setSecoes] = useState([
    {
      id: 1,
      titulo: 'Seção 1: Módulo de Boas-Vindas',
      pastas: [
        { id: 1, titulo: 'Introdução ao Curso' },
        { id: 2, titulo: 'Recursos Adicionais' },
      ],
    },
    {
      id: 2,
      titulo: 'Seção 2: Desenvolvimento Front-End',
      pastas: [
        { id: 3, titulo: 'HTML e CSS' },
        { id: 4, titulo: 'JavaScript Básico' },
      ],
    },
    {
      id: 3,
      titulo: 'Seção 3: Back-end com Node.js',
      pastas: [],
    },
  ]);

  const handleOpenPastaModal = (sectionId: number) => {
    setSelectedSectionId(sectionId);
    setPastaModalOpen(true);
  };

  const handleOpenEditPastaModal = (sectionId: number, folderId: number, currentName: string) => {
    setEditingFolder({ sectionId, folderId, currentName });
    setEditPastaModalOpen(true);
  };

  const handleAddPasta = (folderName: string) => {
    if (selectedSectionId) {
      const newFolder = { id: Date.now(), titulo: folderName };
      setSecoes(secoes.map(sec => 
        sec.id === selectedSectionId ? { ...sec, pastas: [...sec.pastas, newFolder] } : sec
      ));
    }
    setPastaModalOpen(false);
    setSelectedSectionId(null);
  };

  const handleEditPasta = (newName: string) => {
    if (!editingFolder) return;
    const { sectionId, folderId } = editingFolder;

    setSecoes(secoes.map(sec => 
      sec.id === sectionId ? 
      { ...sec, pastas: sec.pastas.map(p => p.id === folderId ? { ...p, titulo: newName } : p) } : 
      sec
    ));

    setEditPastaModalOpen(false);
    setEditingFolder(null);
  };

  const handleDeletePasta = (sectionId: number, folderId: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta pasta?')) {
      setSecoes(secoes.map(sec => 
        sec.id === sectionId ? 
        { ...sec, pastas: sec.pastas.filter(p => p.id !== folderId) } :
        sec
      ));
    }
  };

  const handleAddSection = (sectionName: string) => {
    const newSection = { id: Date.now(), titulo: sectionName, pastas: [] };
    setSecoes([...secoes, newSection]);
    setSecaoModalOpen(false);
  };

  const moveSection = (sectionId: number, direction: 'up' | 'down') => {
    const index = secoes.findIndex(s => s.id === sectionId);
    if (index === -1) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= secoes.length) return;

    const newSecoes = [...secoes];
    const temp = newSecoes[index];
    newSecoes[index] = newSecoes[newIndex];
    newSecoes[newIndex] = temp;

    setSecoes(newSecoes);
  };

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
          zIndex: 1300, // Garante que fique acima do cabeçalho
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Container component="main" sx={{ mt: 10, flexGrow: 1, pb: 12 }}>
        <Card sx={{ mb: 4, bgcolor: '#1E1E1E', borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography component="h1" variant="h4">
                Conteúdo do Curso {id}
              </Typography>
              {id && <BotaoConfiguracoesCurso id={id} />}
            </Box>
          </CardContent>
        </Card>

        <SecaoConteudo 
          cursoId={id!}
          secoes={secoes} 
          handleCreateFolder={handleOpenPastaModal} 
          handleEditFolder={handleOpenEditPastaModal}
          handleDeleteFolder={handleDeletePasta}
          onMoveSection={moveSection}
        />

      </Container>

      <BotaoCriarSecao onCreateSection={() => setSecaoModalOpen(true)} />
      <ModalCriarSecao 
        open={secaoModalOpen} 
        onClose={() => setSecaoModalOpen(false)} 
        onConfirm={handleAddSection} 
      />
      <ModalCriarPasta
        open={pastaModalOpen}
        onClose={() => setPastaModalOpen(false)}
        onConfirm={handleAddPasta}
      />
      {editingFolder && (
        <ModalEditarPasta
          open={editPastaModalOpen}
          onClose={() => setEditPastaModalOpen(false)}
          onConfirm={handleEditPasta}
          currentName={editingFolder.currentName}
        />
      )}
    </ThemeProvider>
  );
};

export default ConteudoCurso;
