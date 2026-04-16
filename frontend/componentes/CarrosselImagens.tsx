
import React from 'react';
import { CardMedia } from '@mui/material';

interface CarrosselImagensProps {
  imagemUrl: string;
  nomeCurso: string;
}

const CarrosselImagens: React.FC<CarrosselImagensProps> = ({ imagemUrl, nomeCurso }) => {
  return (
    <CardMedia
      component="img"
      height="400"
      image={imagemUrl}
      alt={nomeCurso}
    />
  );
};

export default CarrosselImagens;
