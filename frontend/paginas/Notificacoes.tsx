import React, { useState } from 'react';
import { Container, Typography, Box, CssBaseline, GlobalStyles } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../componentes/Footer';
import Cabecalho from '../componentes/Cabecalho';
import NotificacaoCard from '../componentes/conteiner.notificacao';
import FiltroCategoria, { CategoriaNotificacao } from '../componentes/FiltroCategoria';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
});

const notificacoes = [
  {
    tipo: 'venda',
    mensagem: 'Você vendeu um curso de React Native!',
    data: '2 dias atrás',
    lida: false,
    valor: 99.90,
    metodo: 'Cartão de Crédito',
    pais: '🇧🇷'
  },
  {
    tipo: 'pendente',
    mensagem: 'Sua proposta para o curso de NodeJS está pendente.',
    data: '1 dia atrás',
    lida: false,
    valor: 129.90,
    metodo: 'Boleto',
    pais: '🇧🇷'
  },
  {
    tipo: 'novo_curso', 
    mensagem: 'Você comprou o curso de TypeScript Avançado.',
    data: '3 dias atrás',
    lida: true,
    valor: 149.90,
    metodo: 'Cartão de Débito',
    pais: '🇵🇹'
  }
];

const Notificacoes: React.FC = () => {
  const [categoria, setCategoria] = useState<CategoriaNotificacao>('todas');

  const notificacoesFiltradas = notificacoes.filter(n => 
    categoria === 'todas' || n.tipo === categoria
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: "#121212" } }} />
      <Cabecalho />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Container sx={{ mt: 10, mb: 8, flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>Notificações</Typography>

          <FiltroCategoria 
            categoriaSelecionada={categoria}
            onCategoriaChange={setCategoria}
          />

          {notificacoesFiltradas.map((notificacao, index) => (
            <NotificacaoCard
              key={index}
              tipo={notificacao.tipo as any}
              mensagem={notificacao.mensagem}
              data={notificacao.data}
              lida={notificacao.lida}
              valor={notificacao.valor}
              metodo={notificacao.metodo}
              pais={notificacao.pais}
            />
          ))}

        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Notificacoes;
