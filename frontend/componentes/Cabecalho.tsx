import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import Logo from './logo';

const Cabecalho: React.FC = () => {
  return (
    <AppBar 
      position="fixed" 
      sx={{
        backgroundColor: 'rgba(30, 30, 30, 0.7)',
        backdropFilter: 'blur(10px)',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Logo />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Cabecalho;
