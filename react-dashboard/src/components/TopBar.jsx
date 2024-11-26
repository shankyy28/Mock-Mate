import React from 'react';
import { AppBar, Toolbar, Typography, InputBase, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // Importing Menu icon for sidebar toggle
import { Search, AccountCircle } from '@mui/icons-material';

const TopBar = ({ toggleSidebar }) => {
  return (
    <AppBar position="fixed" sx={{ zIndex: 1201, height: '64px' }}> {/* Set a fixed height */}
      <Toolbar>
        <IconButton onClick={toggleSidebar} sx={{ color: 'white', marginRight: '16px' }}>
          <MenuIcon /> {/* Material UI icon for sidebar toggle */}
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: 'Cursive, sans-serif' }}>
          MockMate: An AI Interview Simulator
        </Typography>
        <div style={{ position: 'relative', marginRight: '20px' }}>
          <InputBase
            placeholder="Search..."
            sx={{
              color: 'lightgray',
              backgroundColor: '#333333',
              borderRadius: '4px',
              padding: '5px 10px',
              width: '200px',
            }}
            onFocus={(e) => (e.target.style.color = 'white')}
            onBlur={(e) => (e.target.style.color = 'lightgray')}
          />
          <IconButton sx={{ position: 'absolute', right: 0, top: 0 }}>
            <Search sx={{ color: 'lightgray' }} />
          </IconButton>
        </div>
        <IconButton sx={{ color: 'white' }}>
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
