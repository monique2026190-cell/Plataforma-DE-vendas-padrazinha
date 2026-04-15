import React from 'react';
import { IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';

interface BotaoConfiguracoesProps {
  id: string;
}

const BotaoConfiguracoesCurso: React.FC<BotaoConfiguracoesProps> = ({ id }) => {
  const navigate = useNavigate();

  return (
    <IconButton onClick={() => navigate(`/curso/${id}/configuracoes`)} aria-label="configurações">
      <SettingsIcon />
    </IconButton>
  );
};

export default BotaoConfiguracoesCurso;
