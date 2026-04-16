
import React from 'react';
import { Card, CardContent, Typography, TextField, Box } from '@mui/material';

interface SessaoInfoCursoProps {
  nome: string;
  setNome: (nome: string) => void;
  descricao: string;
  setDescricao: (descricao: string) => void;
}

const SessaoInfoCurso: React.FC<SessaoInfoCursoProps> = ({ nome, setNome, descricao, setDescricao }) => {
  return (
    <Box sx={{ p: 3, bgcolor: '#1E1E1E', borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>Informações do Curso</Typography>
      <TextField
        label="Nome do Curso"
        variant="filled"
        fullWidth
        margin="normal"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        sx={{
          bgcolor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: 1,
          '& .MuiFilledInput-underline:before': { borderBottom: 0 },
          '& .MuiFilledInput-underline:after': { borderBottom: 0 },
        }}
        InputLabelProps={{
          style: { color: 'rgba(255, 255, 255, 0.7)' }
        }}
      />
      <TextField
        label="Descrição"
        variant="filled"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        sx={{
          bgcolor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: 1,
          '& .MuiFilledInput-underline:before': { borderBottom: 0 },
          '& .MuiFilledInput-underline:after': { borderBottom: 0 },
        }}
        InputLabelProps={{
          style: { color: 'rgba(255, 255, 255, 0.7)' }
        }}
      />
    </Box>
  );
};

export default SessaoInfoCurso;
