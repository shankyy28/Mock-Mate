import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import DashboardContent from './components/DashboardContent';
import UserProfile from './pages/UserProfile';
import InterviewData from './pages/InterviewData';
import FAQ from './pages/FAQ';
import Scores from './pages/Scores';
import ResumeAnalysis from './pages/ResumeAnalysis';
import Feedback from './pages/Feedback';
import PerformanceMetrics from './pages/PerformanceMetrics';
import UserEngagement from './pages/UserEngagement';
import ResumeUploader from './components/ResumeUploader'; // Import ResumeUploader
import darkTheme from './theme/theme';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [workflowStep, setWorkflowStep] = useState("dashboard"); // Track the workflow step

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const startInterviewProcess = () => {
    setWorkflowStep("resumeParsing"); // Move to resume parsing
  };

  const handleResumeParsed = () => {
    setWorkflowStep("interviewData"); // Move to the interview data step after parsing
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <TopBar toggleSidebar={toggleSidebar} />
        <SideBar open={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div>
          {workflowStep === "dashboard" && (
            <DashboardContent startInterview={startInterviewProcess} /> // Pass the handler for starting the interview process
          )}
          {workflowStep === "resumeParsing" && (
            <ResumeUploader onResumeParsed={handleResumeParsed} /> // Pass the handler for resume parsing
          )}
          {workflowStep === "interviewData" && <InterviewData />} {/* Move to interview step */}
        </div>
        <Routes>
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/scores" element={<Scores />} />
          <Route path="/resume-analysis" element={<ResumeAnalysis />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/performance-metrics" element={<PerformanceMetrics />} />
          <Route path="/user-engagement" element={<UserEngagement />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
