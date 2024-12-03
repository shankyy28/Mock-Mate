import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Drawer, Typography, Avatar } from '@mui/material';
import { Home, Info, Assessment, Feedback, Score } from '@mui/icons-material'; // Import icons
import { useNavigate } from 'react-router-dom';

const SideBar = ({ open, toggleSidebar }) => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        '& .MuiDrawer-paper': {
          backgroundColor: '#1e1e1e',
          width: '240px',
          color: '#ffffff',
          marginTop: '64px', // Ensures the sidebar aligns below the top bar
          height: 'calc(100% - 64px)', // Adjusting the sidebar height to avoid overlapping with the top bar
        },
      }}
    >
      <Box sx={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* User Profile Circle */}
        <Avatar 
          src="/path/to/user.png" // Replace with the path to the user's image
          sx={{ width: 60, height: 60, marginBottom: '10px', cursor: 'pointer' }}
          onClick={() => navigate('/user-profile')} // Navigate to user profile on click
        />
        <Typography variant="h6" sx={{ color: '#ffffff', marginBottom: '16px' }}>
          John Doe {/* Replace with dynamic username */}
        </Typography>
      </Box>

      <List>
        {[
          { text: 'User Profile', icon: <Home />, path: '/user-profile' },
          { text: 'Interview Data', icon: <Assessment />, path: '/interview-data' },
          { text: 'FAQ', icon: <Info />, path: '/faq' },
          { text: 'Scores', icon: <Score />, path: '/scores' },
          { text: 'Resume Analysis', icon: <Feedback />, path: '/resume-analysis' },
          { text: 'Feedback', icon: <Feedback />, path: '/feedback' },
          { text: 'Performance Metrics', icon: <Assessment />, path: '/performance-metrics' },
          { text: 'User Engagement', icon: <Assessment />, path: '/user-engagement' },
        ].map((item, index) => (
          <ListItem 
            button 
            key={index} 
            onClick={() => {
              navigate(item.path);
              toggleSidebar(); // Close sidebar after navigating if needed
            }} 
            sx={{ '&:hover': { backgroundColor: '#333333' } }}
          >
            <ListItemIcon sx={{ color: '#ffffff' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideBar;
