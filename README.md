# Mock-Mate: An AI Interview Simulator

## Overview
MockMate is an AI-powered platform designed to assist freshers in honing their interview skills. The application provides a realistic mock interview experience, helping users improve their confidence, technical knowledge, and communication skills.

---

## Features
- **Login & Sign-Up Page:** Secure authentication with a user-friendly interface.
- **Dynamic Question and Feedboack Generation:** Uses the LLaMA model to generate interview questions tailored to user resumes and feedback based on the answers to the generated questions.
- **Interactive Dashboard:** A user-friendly dashboard to access statistics, feedback, and interview results.
- **Resume Uploader:** Seamlessly upload resumes to personalize interview questions and parses the resume for top technical skills.

---

## Project Structure
```plaintext
MockMate/
├── CLIENT/
│   ├── src/
│   │   ├── components/
│   │   │   ├── DashboardContent.jsx  # Dashboard implementation
│   │   │   ├── ResumeUploader.jsx    # Resume upload and parsing functionality
│   │   │   ├── Interview.jsx         # Mock interview simulator interface
├── SERVER/
│   ├── app.py                        # Backend API server
│   ├── model.py                      # Load Model file for Llama-3.2-1B-Instruct
│   ├── resume_parser.py              # Resume Parser Model
|   ├── svm_model.joblib              # SVM Classifier for Resume Parser Model
|   ├── tfidf_vectorizer.joblib       # TF-IDF Vectorizer for Resume Parser Model
|   ├── use_model.py                  # Llama Model for Questions and Feedback Generation
├── README.md       # Project documentation
```

---

## Installation and Setup

### Prerequisites
- Node.js (for the frontend)
- Python (for the backend)
- Required Python libraries: `Flask`, `transformers`, `nltk`, `spacy`, etc.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/shankyy28/MockMate.git
   cd MockMate
   ```
2. Setup the backend:
   ```bash
   cd SERVER
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python app.py
   ```
3. Setup the frontend:
   ```bash
   cd ../CLIENT
   npm install
   npm start
   ```
4. Access the application at `http://localhost:3000`.

---

## API Endpoints

### Resume Uploader
- **Endpoint:** `POST & GET /resume_parser`
- **Description:** Uploads user resume for question generation through parsing.
- **Input:** Resume file (PDF or DOCX).
- **Output:** Confirmation of upload.

### Mock Interview
- **Endpoint:** `GET /fetch_questions`
- **Description:** Retrieves dynamically generated interview questions from Llama Model.
- **Output:** JSON list of questions.


### Performance Feedback
- **Endpoint:** `POST & GET /evaluate_responses`
- **Description:** Provides feedback based on responses to the questions.
- **Output:** JSON with feedback insights.

---

## Output Screenshots

### Login & Sign-Up Page


### Dashboard


### Resume Uploader


### Mock Interview Simulator


---

## Technologies Used
- **Frontend:** React, Material-UI
- **Backend:** Flask
- **AI Models:** LLaMA for question and feedback generation

---

## Future Enhancements
- Add real-time feedback using natural language processing.
- Include mock interview scoring based on verbal and non-verbal cues.
- Expand support for multiple languages.
