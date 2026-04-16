
import React from 'react';
import { Card, CardContent, ToggleButton, ToggleButtonGroup, Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
import { FormatBold, FormatItalic, FormatUnderlined } from '@mui/icons-material';

interface CardEdicaoNotaProps {
  formats: string[];
  onFormatChange: (event: React.MouseEvent<HTMLElement>, newFormats: string[]) => void;
  font: string;
  onFontChange: (event: SelectChangeEvent) => void;
  color: string;
  onColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const fonts = ['Arial', 'Verdana', 'Times New Roman', 'Courier New', 'Georgia', 'Roboto', 'sans-serif'];

const CardEdicaoNota: React.FC<CardEdicaoNotaProps> = ({ formats, onFormatChange, font, onFontChange, color, onColorChange }) => {
  return (
    <Card sx={{ bgcolor: 'transparent', boxShadow: 'none', mb: 1, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
      <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
        <ToggleButtonGroup
          value={formats}
          onChange={onFormatChange}
          aria-label="text formatting"
        >
          <ToggleButton value="bold" aria-label="bold" sx={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.23)' }}>
            <FormatBold />
          </ToggleButton>
          <ToggleButton value="italic" aria-label="italic" sx={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.23)' }}>
            <FormatItalic />
          </ToggleButton>
          <ToggleButton value="underlined" aria-label="underline" sx={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.23)' }}>
            <FormatUnderlined />
          </ToggleButton>
        </ToggleButtonGroup>
      </CardContent>
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel id="font-select-label" sx={{color: 'rgba(255, 255, 255, 0.7)'}}>Fonte</InputLabel>
        <Select
          labelId="font-select-label"
          value={font}
          onChange={onFontChange}
          label="Fonte"
          sx={{ 
            color: 'white', 
            '& .MuiSvgIcon-root': { color: 'white' }, 
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.23)' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: 'background.paper',
              },
            },
          }}
        >
          {fonts.map((f) => (
            <MenuItem key={f} value={f}>{f}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <input
        type="color"
        value={color}
        onChange={onColorChange}
        style={{
            backgroundColor: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.23)',
            borderRadius: '4px',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            padding: '4px'
        }}
        title="Selecionar cor do texto"
      />
    </Card>
  );
};

export default CardEdicaoNota;
