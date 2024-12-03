import React, { useState, useEffect } from "react";
import axios from "axios";
import WhisperRecorder from "./WhisperRecorder";

const InterviewSimulator = ({ parsedData }) => {
  const { jobRole, skills, experienceLevel } = parsedData;
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [responses, setResponses] = useState([]);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:8000/llama/generate_questions", {
          job_role: jobRole,
          skills,
          experience_level: experienceLevel,
        });
        setQuestions(response.data.questions);
        setCurrentQuestion(response.data.questions[0]);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [jobRole, skills, experienceLevel]);

  const handleResponse = async (responseText) => {
    setResponses((prev) => [...prev, responseText]);
    const nextIndex = responses.length + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestion(questions[nextIndex]);
    } else {
      const feedbackResponse = await axios.post("http://127.0.0.1:8000/llama/evaluate_responses", {
        questions,
        responses: [...responses, responseText],
      });
      setFeedback(feedbackResponse.data.feedback);
    }
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "10px" }}>
      <h2>Interview Simulator</h2>
      <div style={{ margin: "20px 0" }}>
        <h3>Question:</h3>
        <p>{currentQuestion}</p>
      </div>
      <WhisperRecorder onTranscription={handleResponse} />
      {feedback && (
        <div style={{ marginTop: "20px", color: "#28a745" }}>
          <h3>Feedback:</h3>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
};

export default InterviewSimulator;
