// src/pages/ResumeAnalysis.jsx
import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

const ResumeAnalysis = () => {
  const skills = ['JavaScript', 'React', 'Node.js'];
  const generatedQuestions = [
    'What is the difference between React and Angular?',
    'How do you handle state management in large-scale applications?',
  ];

  return (
    <Card sx={{ maxWidth: 800, margin: '20px auto' }}>
      <CardContent>
        <Typography variant="h6">Resume Analysis</Typography>
        <Typography variant="subtitle1">Extracted Skills:</Typography>
        <List>
          {skills.map((skill, index) => (
            <ListItem key={index}>
              <ListItemText primary={skill} />
            </ListItem>
          ))}
        </List>
        <Typography variant="subtitle1" sx={{ marginTop: '20px' }}>Generated Interview Questions:</Typography>
        <List>
          {generatedQuestions.map((question, index) => (
            <ListItem key={index}>
              <ListItemText primary={question} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default ResumeAnalysis;
