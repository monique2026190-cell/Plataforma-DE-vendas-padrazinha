
import React from 'react';
import { Box, Typography } from '@mui/material';

interface DescricaoCursoCardProps {
  nome: string;
  descricao: string;
  preco: string;
}

const DescricaoCursoCard: React.FC<DescricaoCursoCardProps> = ({ nome, descricao, preco }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography gutterBottom variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
        {nome}
      </Typography>
      <Typography variant="body1" sx={{ color: '#BDBDBD', marginBottom: 2 }}>
        {descricao}
      </Typography>
      <Typography variant="h5" sx={{ marginBottom: 2, color: '#BB86FC', fontWeight: 'bold' }}>
        {preco}
      </Typography>
    </Box>
  );
};

export default DescricaoCursoCard;
