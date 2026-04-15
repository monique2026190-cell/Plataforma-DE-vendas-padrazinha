import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface DescricaoCursoCardProps {
  descricao: string;
}

const DescricaoCursoCard: React.FC<DescricaoCursoCardProps> = ({ descricao }) => {
  return (
    <Card sx={{ bgcolor: 'background.paper', mt: 3 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Descrição do Curso
        </Typography>
        <Typography variant="body1">
          {descricao}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DescricaoCursoCard;
