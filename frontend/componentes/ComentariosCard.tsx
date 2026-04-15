import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface Comment {
  user: string;
  text: string;
}

interface ComentariosCardProps {
  comments: Comment[];
}

const ComentariosCard: React.FC<ComentariosCardProps> = ({ comments }) => {
  return (
    <Card sx={{ bgcolor: 'background.paper', mt: 3 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Comentários
        </Typography>
        {comments.map((comment, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>{comment.user}</Typography>
            <Typography variant="body2">{comment.text}</Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default ComentariosCard;
