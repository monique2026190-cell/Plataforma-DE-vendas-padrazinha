
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

const provedores = ['Stripe', 'Mercado Pago'];

interface ModalSelecaoProvedorProps {
  open: boolean;
  onClose: () => void;
  onSelectProvedor: (provedor: string) => void;
}

const ModalSelecaoProvedor: React.FC<ModalSelecaoProvedorProps> = ({ open, onClose, onSelectProvedor }) => {
  const handleSelect = (provedor: string) => {
    onSelectProvedor(provedor);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-selecao-provedor-title"
    >
      <Box sx={style}>
        <Typography id="modal-selecao-provedor-title" variant="h6" component="h2" sx={{ mb: 2 }}>
          Selecione o Provedor de Pagamento
        </Typography>
        <List>
          {provedores.map((provedor) => (
            <React.Fragment key={provedor}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleSelect(provedor)}>
                  <ListItemText primary={provedor} />
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

export default ModalSelecaoProvedor;
