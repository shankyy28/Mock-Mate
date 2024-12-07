// src/pages/Scores.jsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import BarChartComponent from '../components/BarChartComponent';

const Scores = () => {
  return (
    <Card sx={{ maxWidth: 800, margin: '20px auto' }}>
      <CardContent>
        <Typography variant="h6" align="center">Scores</Typography>
        <BarChartComponent />
      </CardContent>
    </Card>
  );
};

export default Scores;
