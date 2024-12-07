import React, { useState, useEffect } from "react";
import axios from "axios";
import WhisperRecorder from "./WhisperRecorder";

const InterviewSimulator = ({ parsedData }) => {
  const { jobRole, skills, experienceLevel } = parsedData;
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
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
        if (response.data.questions.length > 0) {
          setCurrentQuestion(response.data.questions[0]);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [jobRole, skills, experienceLevel]);

  const handleResponse = async (responseText) => {
    setResponses((prev) => [...prev, responseText]);
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setCurrentQuestion(questions[nextIndex]);
    } else {
      // All questions answered, send responses for feedback
      try {
        const feedbackResponse = await axios.post("http://127.0.0.1:8000/llama/evaluate_responses", {
          questions,
          responses: [...responses, responseText],
        });
        setFeedback(feedbackResponse.data.feedback);
      } catch (error) {
        console.error("Error evaluating responses:", error);
      }
    }
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "10px" }}>
      <h2>Interview Simulator</h2>
      <div style={{ margin: "20px 0" }}>
        {currentQuestion ? (
          <>
            <h3>Question:</h3>
            <p>{currentQuestion}</p>
            <WhisperRecorder onTranscription={handleResponse} />
          </>
        ) : (
          <p>Loading questions...</p>
        )}
      </div>
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
