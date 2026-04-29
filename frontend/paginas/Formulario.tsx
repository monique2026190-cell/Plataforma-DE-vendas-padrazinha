
import React from 'react';
import { Box, Button, Container, TextField, Paper } from '@mui/material';
import Cabecalho from '../componentes/Cabecalho';

const Formulario: React.FC = () => {
  return (
    <Box sx={{ bgcolor: '#121212', minHeight: '100vh' }}>
      <Cabecalho />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // py: 5, // Removido para eliminar o espaçamento vertical
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 2,
              bgcolor: '#1e1e1e',
              color: 'white',
              mt: 5, // Adicionado margem no topo para separar do cabeçalho
            }}
          >
            {/* O título foi movido para o cabeçalho */}
            <form noValidate autoComplete="off">
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                  label="Nome Completo"
                  variant="outlined"
                  fullWidth
                  required
                  InputLabelProps={{
                    style: { color: '#bbb' },
                  }}
                  InputProps={{
                    style: { color: 'white', backgroundColor: '#333' },
                  }}
                />
                <TextField
                  label="CPF"
                  variant="outlined"
                  fullWidth
                  required
                  InputLabelProps={{
                    style: { color: '#bbb' },
                  }}
                  InputProps={{
                    style: { color: 'white', backgroundColor: '#333' },
                  }}
                />
                <TextField
                  label="Título de Eleitor"
                  variant="outlined"
                  fullWidth
                  required
                  InputLabelProps={{
                    style: { color: '#bbb' },
                  }}
                  InputProps={{
                    style: { color: 'white', backgroundColor: '#333' },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    mt: 2,
                    py: 1.5,
                    bgcolor: '#BB86FC',
                    '&:hover': {
                      bgcolor: '#A06CD5',
                    },
                  }}
                >
                  Cadastrar
                </Button>
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Formulario;
