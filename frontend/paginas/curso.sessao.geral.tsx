import React from 'react';
import { List } from '@mui/material';
import { Edit, Photo } from '@mui/icons-material';
import { SectionTitle, SettingsListItem } from '../componentes/SettingsComponents';

export const GeralSection: React.FC = () => (
  <List>
    <SectionTitle>Geral</SectionTitle>
    <SettingsListItem icon={<Edit />} label="Editar Título e Descrição" />
    <SettingsListItem icon={<Photo />} label="Alterar Imagem de Capa" />
  </List>
);
