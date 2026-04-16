
import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ModalCriarNotaProps {
  open: boolean;
  onClose: () => void;
  onSave: (conteudo: string) => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
};

const ModalCriarNota: React.FC<ModalCriarNotaProps> = ({ open, onClose, onSave }) => {
  const [conteudo, setConteudo] = useState('');

  const handleSave = () => {
    onSave(conteudo);
    setConteudo('');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Criar Nova Nota
        </Typography>
        <TextField
          label="Conteúdo da Nota"
          multiline
          rows={10}
          variant="outlined"
          fullWidth
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
          sx={{ flexGrow: 1, mb: 2 }}
        />
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!conteudo.trim()}
        >
          Salvar Nota
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalCriarNota;
