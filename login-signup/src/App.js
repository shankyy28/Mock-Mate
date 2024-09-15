import React from 'react';
import LoginSignup from './scenes/LoginSignup/LoginSignup';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { darkTheme } from './theme'; // Import the dark theme
import Topbar from './scenes/global/Topbar';
import { Sidebar } from 'react-pro-sidebar';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className = "app" >
        <Sidebar isSidebar = {isSidebar} />
        <main className="content">
          <Topbar setIsSidebar = {setIsSidebar}/>
          <Routes>
            <Route path="/" element={<LoginSignup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/study-material" element={<Studymaterial />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/scores" element={<Score />} />
            <Route path="/aboutus" element={<Aboutus />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
