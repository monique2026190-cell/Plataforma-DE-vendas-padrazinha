import React from 'react';
import { Box, Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { SectionTitle } from '../componentes/SettingsComponents';

export const ZonaPerigoSection: React.FC = () => (
  <Box sx={{ mt: 4, px: 1 }}>
    <SectionTitle>Zona de Perigo</SectionTitle>
    <Button
      fullWidth
      variant="outlined"
      color="error"
      startIcon={<Delete />}
      sx={{
        p: '12px',
        borderRadius: 2.5,
        textTransform: 'none',
        fontWeight: 600,
        borderColor: 'rgba(255, 82, 82, 0.5)',
        color: 'rgba(255, 82, 82, 0.9)',
        '&:hover': {
          borderColor: 'rgba(255, 82, 82, 0.8)',
          bgcolor: 'rgba(255, 82, 82, 0.1)',
        },
      }}
    >
      Excluir Curso Permanentemente
    </Button>
  </Box>
);
