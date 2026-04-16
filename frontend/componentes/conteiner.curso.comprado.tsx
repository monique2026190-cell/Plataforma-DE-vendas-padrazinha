import React from 'react';
import { Box, Typography } from '@mui/material';
import NotificacaoCard from './conteiner.notificacao';

interface CursosCompradosContainerProps {
  notificacoes: any[];
}

const CursosCompradosContainer: React.FC<CursosCompradosContainerProps> = ({ notificacoes }) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>Cursos Comprados</Typography>
      {notificacoes.map((notificacao, index) => (
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
    </Box>
  );
};

export default CursosCompradosContainer;
