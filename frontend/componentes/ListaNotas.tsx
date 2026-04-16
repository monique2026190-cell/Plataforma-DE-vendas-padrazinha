
import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

interface Nota {
  id: string;
  conteudo: string;
  criadoEm: Date;
}

interface ListaNotasProps {
  notas: Nota[];
}

const ListaNotas: React.FC<ListaNotasProps> = ({ notas }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Notas da Aula
      </Typography>
      {notas.length === 0 ? (
        <Typography color="text.secondary">Nenhuma nota adicionada ainda.</Typography>
      ) : (
        <List>
          {notas.map((nota) => (
            <ListItem key={nota.id} sx={{ px: 0 }}>
              <Paper elevation={3} sx={{ width: '100%', p: 2, bgcolor: '#2E2E2E' }}>
                <ListItemText
                  primary={nota.conteudo}
                  secondary={`Criado em: ${new Date(nota.criadoEm).toLocaleString()}`}
                />
              </Paper>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default ListaNotas;
