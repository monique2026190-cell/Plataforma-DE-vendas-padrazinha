
import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import api from '../servicos/api'; // Assuming you have an API service configured

const StripeLogo = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M42.6667 10.6667H5.33333C4.59695 10.6667 4 11.2636 4 12V36C4 36.7364 4.59695 37.3333 5.33333 37.3333H42.6667C43.403 37.3333 44 36.7364 44 36V12C44 11.2636 43.403 10.6667 42.6667 10.6667Z" fill="#6772E5"/>
        <path d="M14.6667 24C14.6667 20.6863 17.353 18 20.6667 18C23.9804 18 26.6667 20.6863 26.6667 24C26.6667 27.3137 23.9804 30 20.6667 30C17.353 30 14.6667 27.3137 14.6667 24Z" fill="white"/>
        <path d="M30.6667 18H36V30H30.6667V25.3333H28V22.6667H30.6667V18Z" fill="white"/>
    </svg>
);


const CardConexaoStripe: React.FC = () => {

  const handleConnect = async () => {
    try {
      // This now points to the correct backend route
      const { data } = await api.post('/stripe/connect');
      window.location.href = data.url;
    } catch (error) {
      console.error("Erro ao conectar com o Stripe:", error);
    }
  };

  return (
      <Card
        sx={{
          borderRadius: '16px',
          backgroundColor: '#1E1E1E',
          boxShadow: '0 4px 12px 0 rgba(0,0,0,0.3)',
          p: 2,
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <StripeLogo />
          </Box>
          <Typography variant="h6" component="div" sx={{ fontWeight: '600', color: '#FFFFFF', mb: 1 }}>
            Conectar com Stripe
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
            Conecte sua conta Stripe para receber pagamentos de forma segura e gerenciar suas transações diretamente na plataforma.
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={handleConnect}
            sx={{
              py: 1.5,
              fontWeight: 'bold',
              color: 'white',
              backgroundColor: '#6772E5',
              '&:hover': { backgroundColor: '#5563C1' },
            }}
          >
            Conectar com Stripe
          </Button>
        </CardContent>
      </Card>
    );
};

export default CardConexaoStripe;
