// src/pages/PerformanceMetrics.jsx
import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

const PerformanceMetrics = () => {
  const metrics = [
    { metric: 'Model Accuracy', value: '92%' },
    { metric: 'Feedback Quality', value: 'High' },
    { metric: 'User Satisfaction', value: '85%' },
  ];

  return (
    <Card sx={{ maxWidth: 800, margin: '20px auto' }}>
      <CardContent>
        <Typography variant="h6">Performance Metrics</Typography>
        <List>
          {metrics.map((metric, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={metric.metric}
                secondary={metric.value}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetrics;
