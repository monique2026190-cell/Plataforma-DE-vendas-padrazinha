
import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper, IconButton, Link } from '@mui/material';
import { CloudDownload as CloudDownloadIcon } from '@mui/icons-material';

interface Arquivo {
  id: string;
  nome: string;
  url: string;
  criadoEm: Date;
}

interface ListaArquivosProps {
  arquivos: Arquivo[];
}

const ListaArquivos: React.FC<ListaArquivosProps> = ({ arquivos }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Arquivos da Aula
      </Typography>
      {arquivos.length === 0 ? (
        <Typography color="text.secondary">Nenhum arquivo adicionado ainda.</Typography>
      ) : (
        <List>
          {arquivos.map((arquivo) => (
            <ListItem key={arquivo.id} sx={{ px: 0 }}>
              <Paper elevation={3} sx={{ width: '100%', p: 2, bgcolor: '#2E2E2E', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <ListItemText
                  primary={arquivo.nome}
                  secondary={`Adicionado em: ${new Date(arquivo.criadoEm).toLocaleString()}`}
                />
                <Link href={arquivo.url} target="_blank" rel="noopener noreferrer" download>
                  <IconButton aria-label="download">
                    <CloudDownloadIcon />
                  </IconButton>
                </Link>
              </Paper>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default ListaArquivos;
