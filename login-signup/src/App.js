import React from 'react';
import LoginSignup from './scenes/LoginSignup/LoginSignup';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { darkTheme } from './theme'; // Import the dark theme
import Topbar from './scenes/global/Topbar';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {/* <div>
        <LoginSignup />
      </div> */}
      <div className = "app" >
        <main className="content">
          <Topbar />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
