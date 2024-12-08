import React, { useState } from "react";
import axios from "axios";
import './App.css';

const ResumeUploader = () => {
  const [file, setFile] = useState(null);
  const [jobProfile, setJobProfile] = useState("");
  const [skills, setSkills] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [experience, setExperience] = useState("");
  

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !experience) {
      alert("Please upload a PDF file and select your experience level.");
      return;
    }
  
    const formData = new FormData();
    formData.append("resume_pdf", file);
    formData.append("experience", experience);
    formData.append("job_profile", jobProfile);
  
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/start-interview",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(response.data);
      setJobProfile(response.data.job_role);
      setSkills(response.data.skills);
      setQuestions(response.data.questions);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to process the resume.");
    }
  };  

  const handleStartInterview = async () => {
    if (!jobProfile || !skills.length || !experience) {
      alert("Please make sure you have a job profile, skills, and experience level.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/start-interview", {
        resume_pdf: file.name, // or use any identifier for the uploaded file
        job_role: jobProfile,
        experience_level: experience,
        skills: skills,
      });
      
      // Here, we just log the response for debugging purposes
      console.log("Interview questions generated:", response.data.questions);
    } catch (error) {
      console.error("Error starting the interview:", error);
      alert("Failed to generate interview questions.");
    }
  };

  return (
    <div className="container">
      <h2>Resume Prediction</h2>
      <input type="file" accept=".pdf" onChange={handleFileChange} />

      {/* Dropdown for experience level */}
      <label htmlFor="experience"><h3>Select Experience Level</h3></label>
      <select
        id="experience"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
      >
        <option value="">Select level</option>
        <option value="fresher:<0">Fresher</option>
        <option value="beginner:0-2">Beginner: 0 - 2 years</option>
        <option value="intermediate:2-5">Intermediate: 2 - 5 years</option>
        <option value="professional:5+">Professional: 5+ years</option>
      </select>

      

      <div className="job-profile-section">
        <h3>Job Profile</h3>
        <input
          type="text"
          id="jobProfile"
          value={jobProfile}
          onChange={(e) => setJobProfile(e.target.value)}
          placeholder="Enter Job Profile"
        />
      </div>

      <button onClick={handleUpload}>Upload Resume</button>
      

      {jobProfile && (
        <section>
          <h3>Confirmed Job Profile</h3>
          <p>{jobProfile}</p>
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <h3>Top Skills:</h3>
          <ul>
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </section>
      )}

      {questions.length > 0 && (
        <section>
          <h3>Questions:</h3>
          <ul>
            {questions.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </section>
      )}

      {jobProfile && skills.length > 0 && (
        <button onClick={handleStartInterview}>Start Interview</button>
      )}
    </div>
  );
};

export default ResumeUploader;
