
import React, { useState } from 'react';
import { Box, Typography, Stack, ButtonBase } from '@mui/material';
import { Campaign as CampaignIcon } from '@mui/icons-material';
import ModalSelecaoCampanha from './modal.selecao.campanha';

const SessaoMarketing: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [plataformaSelecionada, setPlataformaSelecionada] = useState('');

  const cardStyle = {
    p: 2,
    width: '100%',
    bgcolor: 'background.paper',
    border: '1px solid gray',
    color: 'white',
    textAlign: 'left',
    borderRadius: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    '&:hover': {
        borderColor: 'white',
    }
  };

  return (
    <Box sx={{ my: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Configuração de Marketing</Typography>
        
        <Stack spacing={2}>
            <ButtonBase onClick={() => setModalOpen(true)} sx={cardStyle}>
                <CampaignIcon sx={{ color: 'text.secondary', mr: 1.5 }} />
                <Typography variant="body1" sx={{ color: 'text.secondary', mr: 0.5 }}>Plataforma ADS:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{plataformaSelecionada || 'Selecionar'}</Typography>
            </ButtonBase>
        </Stack>

        <ModalSelecaoCampanha 
            open={isModalOpen} 
            onClose={() => setModalOpen(false)} 
            onSelectCampanha={setPlataformaSelecionada} 
        />
    </Box>
  );
};

export default SessaoMarketing;
