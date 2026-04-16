
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
    <Card sx={{ mb: 3, borderRadius: 2, p: 2, bgcolor: 'background.paper' }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>Informações do Curso</Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            label="Nome do Curso"
            variant="outlined"
            fullWidth
            margin="normal"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
          <TextField
            label="Descrição"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SessaoInfoCurso;
