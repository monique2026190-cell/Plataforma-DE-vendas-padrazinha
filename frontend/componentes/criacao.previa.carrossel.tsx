
import React, { useState, useEffect } from 'react';
import { Box, Card, CardMedia, IconButton, Typography } from '@mui/material';
import { ArrowBackIosNew as ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

interface PreviaCarrosselProps {
  files: File[];
}

const PreviaCarrossel: React.FC<PreviaCarrosselProps> = ({ files }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    const newImageUrls = files.map(file => URL.createObjectURL(file));
    setImageUrls(newImageUrls);

    return () => {
      newImageUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [files]);

  if (imageUrls.length === 0) {
    return null;
  }

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
  };

  return (
    <Box sx={{ maxWidth: '340px', margin: 'auto', my: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, textAlign: 'left' }}>Pré-visualização</Typography>
      <Box sx={{ position: 'relative' }}>
        <Card sx={{ borderRadius: 2, overflow: 'hidden', bgcolor: 'background.paper', border: '1px solid gray' }}>
          <CardMedia
            component="img"
            sx={{
              width: '100%',
              aspectRatio: '4 / 5',
              objectFit: 'cover',
            }}
            image={imageUrls[activeIndex]}
            alt={`Prévia ${activeIndex + 1}`}
          />
        </Card>
        {imageUrls.length > 1 && (
          <>
            <IconButton
              onClick={handlePrev}
              sx={{ position: 'absolute', top: '50%', left: 8, transform: 'translateY(-50%)', color: 'white', backgroundColor: 'rgba(0,0,0,0.5)', '&:hover': { backgroundColor: 'rgba(0,0,0,0.8)' } }}
            >
              <ArrowBackIos sx={{ fontSize: '1rem' }} />
            </IconButton>
            <IconButton
              onClick={handleNext}
              sx={{ position: 'absolute', top: '50%', right: 8, transform: 'translateY(-50%)', color: 'white', backgroundColor: 'rgba(0,0,0,0.5)', '&:hover': { backgroundColor: 'rgba(0,0,0,0.8)' } }}
            >
              <ArrowForwardIos sx={{ fontSize: '1rem' }} />
            </IconButton>
          </>
        )}
        </Box>
        <Typography sx={{ textAlign: 'center', color: 'gray', mt: 1 }}>
          {`${activeIndex + 1} / ${imageUrls.length}`}
        </Typography>
    </Box>
  );
};

export default PreviaCarrossel;
