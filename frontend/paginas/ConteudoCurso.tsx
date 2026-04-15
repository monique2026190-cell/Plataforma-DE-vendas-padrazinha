import React from 'react';
import {
  Typography, 
  Container, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Box, 
  CssBaseline, 
  GlobalStyles, 
  List, 
  ListItem, 
  ListItemText 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FolderIcon from '@mui/icons-material/Folder';
import { useParams } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BotaoConfiguracoesCurso from '../componentes/BotaoConfiguracoesCurso';
import BotaoPublicarConteudo from '../componentes/BotaoPublicarConteudo';
import Cabecalho from '../componentes/Cabecalho';
import Footer from '../componentes/Footer';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
});

const ConteudoCurso: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const secoes = [
    {
      id: 1,
      titulo: 'Seção 1: Módulo de Boas-Vindas',
      pastas: [
        { id: 1, titulo: 'Introdução ao Curso', aulas: ['Aula 1: Apresentação', 'Aula 2: Navegando na plataforma'] },
        { id: 2, titulo: 'Recursos Adicionais', aulas: ['Material de apoio', 'Links úteis'] },
      ],
    },
    {
      id: 2,
      titulo: 'Seção 2: Desenvolvimento Front-End',
      pastas: [
        { id: 3, titulo: 'HTML e CSS', aulas: ['Aula 3: Estrutura HTML', 'Aula 4: Estilização com CSS'] },
        { id: 4, titulo: 'JavaScript Básico', aulas: ['Aula 5: Variáveis e tipos de dados', 'Aula 6: Funções e eventos'] },
      ],
    },
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: "#121212" } }} />
      <Cabecalho />
      <Container component="main" sx={{ mt: 10, flexGrow: 1, pb: 12 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography component="h1" variant="h4">
            Conteúdo do Curso {id}
          </Typography>
          {id && <BotaoConfiguracoesCurso id={id} />}
        </Box>

        {secoes.map(secao => (
          <Accordion key={secao.id} sx={{ bgcolor: 'background.paper', color: 'text.primary', mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
              <Typography variant="h6">{secao.titulo}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {secao.pastas.map(pasta => (
                <Accordion key={pasta.id} sx={{ bgcolor: '#2C2C2C', color: 'text.primary', mb: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
                    <FolderIcon sx={{ mr: 1, color: '#FFC107' }} />
                    <Typography>{pasta.titulo}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List dense>
                      {pasta.aulas.map(aula => (
                        <ListItem key={aula}>
                          <ListItemText primary={aula} />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}

      </Container>

      {id && <BotaoPublicarConteudo id={id} />}

      <Footer />
    </ThemeProvider>
  );
};

export default ConteudoCurso;
