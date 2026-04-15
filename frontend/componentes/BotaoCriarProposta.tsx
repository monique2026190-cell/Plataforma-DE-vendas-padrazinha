import React from 'react';
import { Fab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';

const BotaoCriarProposta: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Fab
      onClick={() => navigate(`/criar-proposta`)}
      sx={{
        position: 'fixed',
        bottom: 80,
        right: 30,
        bgcolor: '#1a1d24',
        color: '#ffffff',
        '&:hover': {
          bgcolor: '#2a2d34'
        },
      }}
      aria-label="Criar Proposta"
    >
      <CreateIcon />
    </Fab>
  );
};

export default BotaoCriarProposta;
