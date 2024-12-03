import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';

const DashboardContent = ({ startInterview }) => {
  const [jobRole, setJobRole] = useState('');
  const [skills, setSkills] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [feedback, setFeedback] = useState('');

  const handleGenerateQuestions = async () => {
    const requestBody = {
      job_role: jobRole,
      skills: skills.split(',').map(skill => skill.trim()),
      experience_level: experienceLevel,
    };

    try {
      const response = await fetch('http://localhost:8000/llama/generate_questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (response.ok) {
        setQuestions(data.questions);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error generating questions:', error);
    }
  };

  const handleEvaluateResponses = async () => {
    const requestBody = {
      questions: questions,
      responses: responses,
    };

    try {
      const response = await fetch('http://localhost:8000/llama/evaluate_responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (response.ok) {
        setFeedback(data.feedback);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error evaluating responses:', error);
    }
  };

  return (
    <div>
      <Typography variant="h5">Interview Preparation Dashboard</Typography>
      <Button onClick={startInterview} variant="contained" color="primary" style={{ marginBottom: '20px' }}>
        Start Interview
      </Button>
      
      <div>
        <Typography variant="h6">Generate Interview Questions</Typography>
        <TextField
          label="Job Role"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
          fullWidth
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Skills (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          fullWidth
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Experience Level"
          value={experienceLevel}
          onChange={(e) => setExperienceLevel(e.target.value)}
          fullWidth
          style={{ marginBottom: '10px' }}
        />
        <Button onClick={handleGenerateQuestions} variant="contained" color="secondary">
          Generate Questions
        </Button>

        {questions.length > 0 && (
          <div>
            <Typography variant="h6" style={{ marginTop: '20px' }}>Generated Questions</Typography>
            <ul>
              {questions.map((question, index) => (
                <li key={index}>{question}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div>
        <Typography variant="h6" style={{ marginTop: '30px' }}>Evaluate Responses</Typography>
        {/* Add response input fields or a simple example input */}
        <Button onClick={handleEvaluateResponses} variant="contained" color="success">
          Evaluate Responses
        </Button>

        {feedback && (
          <div>
            <Typography variant="h6" style={{ marginTop: '20px' }}>Feedback</Typography>
            <Typography>{feedback}</Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;
