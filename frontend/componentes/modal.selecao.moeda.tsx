
import React from 'react';
import { Modal, Box, Typography, List, ListItem, ListItemButton, ListItemText, Button, Divider } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#1E1E1E',
  color: 'white',
  border: '1px solid rgba(255, 255, 255, 0.12)',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const moedas = ['BRL', 'USD', 'EUR'];
const moedasNomes: { [key: string]: string } = {
    'BRL': 'Real Brasileiro',
    'USD': 'Dólar Americano',
    'EUR': 'Euro'
}


interface ModalSelecaoMoedaProps {
  open: boolean;
  onClose: () => void;
  onSelectMoeda: (moeda: string) => void;
}

const ModalSelecaoMoeda: React.FC<ModalSelecaoMoedaProps> = ({ open, onClose, onSelectMoeda }) => {
  const handleSelect = (moeda: string) => {
    onSelectMoeda(moeda);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-selecao-moeda-title"
    >
      <Box sx={style}>
        <Typography id="modal-selecao-moeda-title" variant="h6" component="h2" sx={{ mb: 2 }}>
          Selecione a Moeda
        </Typography>
        <List>
          {moedas.map((moeda) => (
            <React.Fragment key={moeda}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleSelect(moeda)}>
                  <ListItemText primary={moeda} secondary={moedasNomes[moeda]} secondaryTypographyProps={{ color: 'rgba(255, 255, 255, 0.7)' }}/>
                </ListItemButton>
              </ListItem>
              <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.12)' }} />
            </React.Fragment>
          ))}
        </List>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button onClick={onClose}>Fechar</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalSelecaoMoeda;
