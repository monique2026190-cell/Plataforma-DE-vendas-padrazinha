
import React from 'react';
import { List } from '@mui/material';
import { ReceiptLong } from '@mui/icons-material';
import { SectionTitle, SettingsListItem } from '../componentes/SettingsComponents';

export const AuditoriaSection: React.FC = () => (
  <List>
    <SectionTitle>Auditoria</SectionTitle>
    <SettingsListItem icon={<ReceiptLong />} label="Auditoria de Entrada e Saída" />
  </List>
);
