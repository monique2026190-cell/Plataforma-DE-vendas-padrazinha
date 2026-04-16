
import React, { useState, useCallback } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDropzone } from 'react-dropzone';

interface ModalAdicionarArquivoProps {
  open: boolean;
  onClose: () => void;
  onUpload: (arquivo: File) => void;
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
  alignItems: 'center',
};

const ModalAdicionarArquivo: React.FC<ModalAdicionarArquivoProps> = ({ open, onClose, onUpload }) => {
  const [arquivo, setArquivo] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setArquivo(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = () => {
    if (arquivo) {
      onUpload(arquivo);
      setArquivo(null);
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Adicionar Arquivo
        </Typography>
        <Box
          {...getRootProps()}
          sx={{
            border: '2px dashed grey',
            borderRadius: 2,
            p: 4,
            width: '100%',
            textAlign: 'center',
            cursor: 'pointer',
            bgcolor: isDragActive ? '#333' : 'transparent',
            mb: 2,
          }}
        >
          <input {...getInputProps()} />
          {
            arquivo ? (
              <Typography>{arquivo.name}</Typography>
            ) : isDragActive ? (
              <Typography>Solte o arquivo aqui...</Typography>
            ) : (
              <Typography>Arraste e solte um arquivo aqui, ou clique para selecionar</Typography>
            )
          }
        </Box>
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={!arquivo}
        >
          Fazer Upload
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalAdicionarArquivo;
