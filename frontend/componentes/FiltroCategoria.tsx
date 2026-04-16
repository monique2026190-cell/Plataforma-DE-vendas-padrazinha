import React from 'react';
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';

// Definindo os tipos para as categorias
export type CategoriaNotificacao = 'todas' | 'venda' | 'pendente' | 'novo_curso';

interface FiltroCategoriaProps {
  categoriaSelecionada: CategoriaNotificacao;
  onCategoriaChange: (novaCategoria: CategoriaNotificacao) => void;
}

const FiltroCategoria: React.FC<FiltroCategoriaProps> = ({ categoriaSelecionada, onCategoriaChange }) => {
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: CategoriaNotificacao | null,
  ) => {
    if (newAlignment !== null) {
      onCategoriaChange(newAlignment);
    }
  };

  return (
    <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
      <ToggleButtonGroup
        value={categoriaSelecionada}
        exclusive
        onChange={handleAlignment}
        aria-label="Filtro de Categoria"
        sx={{
          backgroundColor: '#2A2A2A', // Fundo do container
          borderRadius: '20px',      // Borda arredondada do container
          p: '5px',
          '& .MuiToggleButton-root': {
            color: '#A0A0A0',
            border: 0,
            borderRadius: '15px !important',
            padding: '8px 24px',       // Botões mais largos
            textTransform: 'none',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            '&.Mui-selected': {
              color: '#FFFFFF',
              backgroundColor: '#8A42D4', // Roxo mais escuro
              '&:hover': {
                backgroundColor: '#7A39BD', 
              }
            },
            '&:not(.Mui-selected):hover': {
              backgroundColor: '#3C3C3C',
            }
          }
        }}
      >
        <ToggleButton value="todas" aria-label="todas">
          Todas
        </ToggleButton>
        <ToggleButton value="venda" aria-label="vendas">
          Vendas
        </ToggleButton>
        <ToggleButton value="pendente" aria-label="pendentes">
          Pendentes
        </ToggleButton>
        <ToggleButton value="novo_curso" aria-label="cursos comprados">
          Cursos
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default FiltroCategoria;
