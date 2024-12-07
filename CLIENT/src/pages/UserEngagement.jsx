// src/pages/UserEngagement.jsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import PieChartComponent from '../components/PieChartComponent';

const UserEngagement = () => {
  return (
    <Card sx={{ maxWidth: 800, margin: '20px auto' }}>
      <CardContent>
        <Typography variant="h6" align="center">User Engagement</Typography>
        <PieChartComponent />
      </CardContent>
    </Card>
  );
};

export default UserEngagement;
