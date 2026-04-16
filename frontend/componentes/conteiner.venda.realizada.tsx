import React from 'react';
import { Box, Typography } from '@mui/material';
import NotificacaoCard from './conteiner.notificacao';

interface VendasRealizadasContainerProps {
  notificacoes: any[];
}

const VendasRealizadasContainer: React.FC<VendasRealizadasContainerProps> = ({ notificacoes }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>Vendas Realizadas</Typography>
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

export default VendasRealizadasContainer;
