import React from 'react';
import { List } from '@mui/material';
import { AddCircleOutline, Sort } from '@mui/icons-material';
import { SectionTitle, SettingsListItem } from '../componentes/SettingsComponents';

export const ConteudoSection: React.FC = () => (
  <List>
    <SectionTitle>Conteúdo</SectionTitle>
    <SettingsListItem icon={<AddCircleOutline />} label="Adicionar Novo Módulo" />
    <SettingsListItem icon={<Sort />} label="Reordenar Módulos" />
  </List>
);
