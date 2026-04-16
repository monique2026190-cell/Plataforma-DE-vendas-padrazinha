
import React, { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, Box } from '@mui/material';

interface PreviaGridProps {
  files: File[];
}

const PreviaGrid: React.FC<PreviaGridProps> = ({ files }) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    if (files && files.length > 0) {
      const urls = files.map(file => URL.createObjectURL(file));
      setImageUrls(urls);

      // Cleanup function to revoke the object URLs
      return () => {
        urls.forEach(url => URL.revokeObjectURL(url));
      };
    }
  }, [files]);

  if (!imageUrls || imageUrls.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {imageUrls.map((url, index) => (
          <Grid item xs={3} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={url}
                alt={`Previa ${index + 1}`}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PreviaGrid;
