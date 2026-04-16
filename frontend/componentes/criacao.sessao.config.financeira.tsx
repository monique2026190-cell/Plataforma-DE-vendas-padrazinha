
import React, { useState } from 'react';
import { Box, Typography, ButtonBase, Stack } from '@mui/material';
import { MonetizationOn as MonetizationOnIcon, Public as PublicIcon, CreditCard as CreditCardIcon } from '@mui/icons-material';
import ModalSelecaoMoeda from './modal.selecao.moeda';
import ModalSelecaoProvedor from './modal.selecao.provedor';
import ModalPreco from './modal.preco';

interface SessaoFinanceiraProps {
  preco: string;
  setPreco: (preco: string) => void;
  moeda: string;
  setMoeda: (moeda: string) => void;
  provedor: string;
  setProvedor: (provedor: string) => void;
}

const SessaoFinanceira: React.FC<SessaoFinanceiraProps> = ({ preco, setPreco, moeda, setMoeda, provedor, setProvedor }) => {
  const [isMoedaModalOpen, setMoedaModalOpen] = useState(false);
  const [isProvedorModalOpen, setProvedorModalOpen] = useState(false);
  const [isPrecoModalOpen, setPrecoModalOpen] = useState(false);

  const cardStyle = {
    p: 2,
    width: '100%',
    bgcolor: 'background.paper',
    border: '1px solid gray',
    color: 'white',
    textAlign: 'left',
    borderRadius: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start', // Alinhar tudo à esquerda
    '&:hover': {
        borderColor: 'white',
    }
  };

  return (
    <Box sx={{ my: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Configuração Financeira</Typography>
        
        <Stack spacing={2}>
            <ButtonBase onClick={() => setMoedaModalOpen(true)} sx={cardStyle}>
                <PublicIcon sx={{ color: 'text.secondary', mr: 1.5 }} />
                <Typography variant="body1" sx={{ color: 'text.secondary', mr: 0.5 }}>Moeda:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{moeda || 'Selecionar'}</Typography>
            </ButtonBase>
            
            <ButtonBase onClick={() => setProvedorModalOpen(true)} sx={cardStyle}>
                <CreditCardIcon sx={{ color: 'text.secondary', mr: 1.5 }} />
                <Typography variant="body1" sx={{ color: 'text.secondary', mr: 0.5 }}>Provedor:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{provedor || 'Selecionar'}</Typography>
            </ButtonBase>

            <ButtonBase onClick={() => setPrecoModalOpen(true)} sx={cardStyle}>
                <MonetizationOnIcon sx={{ color: 'text.secondary', mr: 1.5 }} />
                <Typography variant="body1" sx={{ color: 'text.secondary', mr: 0.5 }}>Preço:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{preco ? `${moeda} ${preco}` : 'Definir'}</Typography>
            </ButtonBase>
        </Stack>

        <ModalSelecaoMoeda 
            open={isMoedaModalOpen} 
            onClose={() => setMoedaModalOpen(false)} 
            onSelectMoeda={setMoeda} 
        />
        <ModalSelecaoProvedor 
            open={isProvedorModalOpen} 
            onClose={() => setProvedorModalOpen(false)} 
            onSelectProvedor={setProvedor} 
        />
        <ModalPreco
            open={isPrecoModalOpen}
            onClose={() => setPrecoModalOpen(false)}
            preco={preco}
            setPreco={setPreco}
        />
    </Box>
  );
};

export default SessaoFinanceira;
