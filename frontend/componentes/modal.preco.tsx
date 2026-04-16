
import React from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';

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

interface ModalPrecoProps {
  open: boolean;
  onClose: () => void;
  preco: string;
  setPreco: (preco: string) => void;
}

const ModalPreco: React.FC<ModalPrecoProps> = ({ open, onClose, preco, setPreco }) => {

  const handleSave = () => {
    onClose(); // Fecha o modal ao salvar
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-preco-title"
    >
      <Box sx={style}>
        <Typography id="modal-preco-title" variant="h6" component="h2" sx={{ mb: 2 }}>
          Definir Preço
        </Typography>
        <TextField
            margin="normal"
            required
            fullWidth
            id="preco"
            label="Preço"
            name="preco"
            type="number"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            variant="outlined"
            InputLabelProps={{ style: { color: '#E0E0E0' } }}
            sx={{ mt: 2, input: { color: 'white' }, '.MuiOutlinedInput-root': { '.MuiOutlinedInput-notchedOutline': { borderColor: 'gray' } } }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button onClick={onClose} sx={{ mr: 1 }}>Cancelar</Button>
            <Button onClick={handleSave} variant="contained">Salvar</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalPreco;
