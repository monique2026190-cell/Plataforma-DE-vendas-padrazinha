
import React from 'react';
import { Modal, Box, Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

interface ModalSelecaoCampanhaProps {
  open: boolean;
  onClose: () => void;
  onSelectCampanha: (campanha: string) => void;
}

const campanhas = ['Google Ads', 'TikTok Ads', 'Meta Ads'];

const ModalSelecaoCampanha: React.FC<ModalSelecaoCampanhaProps> = ({ open, onClose, onSelectCampanha }) => {
  const handleSelect = (campanha: string) => {
    onSelectCampanha(campanha);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }}>
        <Typography variant="h6" component="h2">
          Selecione a Campanha
        </Typography>
        <List>
          {campanhas.map((campanha) => (
            <ListItem key={campanha} disablePadding>
              <ListItemButton onClick={() => handleSelect(campanha)}>
                <ListItemText primary={campanha} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Modal>
  );
};

export default ModalSelecaoCampanha;
