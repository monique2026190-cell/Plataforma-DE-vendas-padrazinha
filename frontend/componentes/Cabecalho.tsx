
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Cabecalho: React.FC = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: '#1e1e1e' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Cadastro de Eleitores
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Cabecalho;
