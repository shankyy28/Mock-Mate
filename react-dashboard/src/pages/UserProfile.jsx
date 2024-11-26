// src/pages/UserProfile.jsx
import React from 'react';
import { Card, CardContent, Typography, Avatar } from '@mui/material';

const UserProfile = () => {
  return (
    <Card sx={{ maxWidth: 600, margin: '20px auto' }}>
      <CardContent>
        <Avatar sx={{ width: 80, height: 80, margin: '0 auto 20px' }}>U</Avatar>
        <Typography variant="h5" align="center">John Doe</Typography>
        <Typography variant="body1" align="center" color="textSecondary">Software Engineer</Typography>
        <Typography variant="body2" sx={{ marginTop: '20px' }}>
          Email: johndoe@example.com
        </Typography>
        <Typography variant="body2">Location: New York, USA</Typography>
      </CardContent>
    </Card>
  );
};

export default UserProfile;