// src/pages/InterviewData.jsx
import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

const InterviewData = () => {
  const interviewLogs = [
    { date: '2024-10-10', company: 'ABC Corp', status: 'Pending' },
    { date: '2024-10-12', company: 'XYZ Ltd', status: 'Completed' },
  ];

  return (
    <Card sx={{ maxWidth: 800, margin: '20px auto' }}>
      <CardContent>
        <Typography variant="h6">Interview Data</Typography>
        <List>
          {interviewLogs.map((log, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${log.company} - ${log.status}`}
                secondary={`Date: ${log.date}`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default InterviewData;
