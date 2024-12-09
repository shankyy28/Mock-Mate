import React, { useState, useEffect } from "react";
import axios from "axios";

const InterviewSimulator = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  // Fetch questions from backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:8000/fetch-questions");
        setQuestions(response.data.questions || []);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  // Handle answer submission
  const handleSubmit = async () => {
    if (!currentAnswer.trim()) {
      alert("Please enter an answer!");
      return;
    }

    const updatedAnswers = [...answers, currentAnswer];
    setAnswers(updatedAnswers);
    setCurrentAnswer("");

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsCompleted(true);
      // Store answers in backend
      try {
        await axios.post("http://localhost:8000/store-answers", { answers: updatedAnswers });
      } catch (error) {
        console.error("Error storing answers:", error);
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>MockMate Interview Simulator</h1>
      {isCompleted ? (
        <div style={styles.completed}>
          <h2>Interview Completed!</h2>
          <p>Your responses have been saved. Good luck!</p>
        </div>
      ) : questions.length > 0 ? (
        <div style={styles.questionSection}>
          <p style={styles.question}>
            <strong>Question {currentQuestionIndex + 1}:</strong> {questions[currentQuestionIndex]}
          </p>
          <textarea
            style={styles.textarea}
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            placeholder="Type your answer here..."
          />
          <button style={styles.button} onClick={handleSubmit}>
            {currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}
          </button>
        </div>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
    textAlign: "center",
  },
  heading: {
    fontSize: "2em",
    marginBottom: "20px",
  },
  questionSection: {
    marginTop: "20px",
  },
  question: {
    fontSize: "1.2em",
    marginBottom: "10px",
  },
  textarea: {
    width: "100%",
    height: "100px",
    marginBottom: "10px",
    padding: "10px",
    fontSize: "1em",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1em",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  completed: {
    fontSize: "1.2em",
    color: "green",
  },
};

export default InterviewSimulator;
