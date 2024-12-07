import React from 'react';
import { Grid, Paper, Typography, Button, useTheme } from '@mui/material';
import BarChartComponent from './BarChartComponent';
import LineChartComponent from './LineChartComponent';
import PieChartComponent from './PieChartComponent';
import { useNavigate } from 'react-router-dom';

const DashboardContent = () => {
  const theme = useTheme();
  const navigate = useNavigate(); // Hook for navigation

  return (
    <Grid container spacing={3} style={{ padding: '24px', marginTop: '64px' }}> {/* Added marginTop to push down content */}
      {/* Welcome Message */}
      <Grid item xs={12}>
        <Paper
          style={{
            padding: '24px',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <Typography variant="h4" gutterBottom sx={{ color: theme.palette.blueAccent[500] }}>
              Welcome to your Dashboard!
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.greenAccent[300] }}>
              Here you can view your interview statistics, scores, and more.
            </Typography>
          </div>
        </Paper>
      </Grid>

      {/* Skill Performance Analysis (Bar Chart) */}
      <Grid item xs={12} md={6}>
        <Paper
          style={{
            padding: '16px',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ color: theme.palette.greenAccent[600] }}>
            Skill Performance Analysis
          </Typography>
          <BarChartComponent />
        </Paper>
      </Grid>

      {/* Interview Progress Over Time (Line Chart) */}
      <Grid item xs={12} md={6}>
        <Paper
          style={{
            padding: '16px',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ color: theme.palette.blueAccent[600] }}>
            Interview Progress Over Time
          </Typography>
          <LineChartComponent />
        </Paper>
      </Grid>

      {/* Response Distribution (Pie Chart) */}
      <Grid item xs={12} md={6}>
        <Paper
          style={{
            padding: '16px',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ color: theme.palette.redAccent[600] }}>
            Response Distribution
          </Typography>
          <PieChartComponent />
        </Paper>
      </Grid>

      {/* Latest Feedback Section */}
      <Grid item xs={12} md={6}>
        <Paper
          style={{
            padding: '16px',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ color: theme.palette.greenAccent[600] }}>
            Latest Feedback
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.grey[600] }}>
            You are improving in technical skills, but focus more on communication.
          </Typography>
        </Paper>
      </Grid>

      {/* Start Interview Button */}
      <Grid item xs={12} md={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Paper
          style={{
            padding: '16px',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ color: theme.palette.blueAccent[600] }}>
            Ready to Ace Your Interview?
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/resume-uploader')} // Navigate to the Resume Uploader 
            sx={{
              marginTop: '16px',
              backgroundColor: theme.palette.greenAccent[500],
              color: '#ffffff',
              '&:hover': {
                backgroundColor: theme.palette.greenAccent[700],
              },
            }}
          >
            Start Interview
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DashboardContent;
