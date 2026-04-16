
import React from 'react';
import { Button } from '@mui/material';

interface BotaoComprarProps {
  onClick: () => void;
}

const BotaoComprar: React.FC<BotaoComprarProps> = ({ onClick }) => {
  return (
    <Button 
      variant="contained" 
      size="large" 
      sx={{ backgroundColor: '#BB86FC', '&:hover': { backgroundColor: '#9e66d4' }, m: 3, mt: 0 }}
      onClick={onClick}
    >
      Comprar Agora
    </Button>
  );
};

export default BotaoComprar;
