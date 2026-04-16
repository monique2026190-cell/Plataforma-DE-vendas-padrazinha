import React from 'react';
import { List, Switch } from '@mui/material';
import { Public, MonetizationOn } from '@mui/icons-material';
import { SectionTitle, SettingsListItem } from '../componentes/SettingsComponents';

export const AcessoPublicacaoSection: React.FC = () => (
  <List>
    <SectionTitle>Acesso e Publicação</SectionTitle>
    <SettingsListItem icon={<Public />} label="Curso Público" action={<Switch defaultChecked color="primary" />} />
    <SettingsListItem icon={<MonetizationOn />} label="Monetização" action={<Switch color="primary" />} />
  </List>
);
