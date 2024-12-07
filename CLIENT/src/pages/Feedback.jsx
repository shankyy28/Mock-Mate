// src/pages/Feedback.jsx
import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

const Feedback = () => {
  const feedback = [
    { area: 'Technical Skills', comment: 'Needs to improve algorithm complexity understanding.' },
    { area: 'Communication', comment: 'Good clarity but can be more concise.' },
  ];

  return (
    <Card sx={{ maxWidth: 800, margin: '20px auto' }}>
      <CardContent>
        <Typography variant="h6">Feedback</Typography>
        <List>
          {feedback.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={item.area}
                secondary={item.comment}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default Feedback;
