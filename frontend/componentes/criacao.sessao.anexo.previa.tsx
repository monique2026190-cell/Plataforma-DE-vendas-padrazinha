
import React, { useRef } from 'react';
import { Typography, ButtonBase } from '@mui/material';
import { AttachFile as AttachFileIcon } from '@mui/icons-material';

interface SessaoAnexoPreviaProps {
  previa: File | null;
  onPreviaChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SessaoAnexoPrevia: React.FC<SessaoAnexoPreviaProps> = ({ previa, onPreviaChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCardClick = () => {
    fileInputRef.current?.click();
  };

  const cardStyle = {
    p: 2,
    my: 4,
    width: '100%',
    bgcolor: 'background.paper',
    border: '1px solid gray',
    color: 'white',
    textAlign: 'left',
    borderRadius: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    cursor: 'pointer',
    '&:hover': {
        borderColor: 'white',
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={onPreviaChange}
        style={{ display: 'none' }}
        hidden
      />
      <ButtonBase onClick={handleCardClick} sx={cardStyle}>
        <AttachFileIcon sx={{ color: 'text.secondary', mr: 1.5 }} />
        <Typography variant="body1" sx={{
            fontWeight: previa ? 'bold' : 'normal',
            color: previa ? 'white' : 'text.secondary',
        }}>
            Anexar Prévia
        </Typography>
      </ButtonBase>
    </>
  );
};

export default SessaoAnexoPrevia;
