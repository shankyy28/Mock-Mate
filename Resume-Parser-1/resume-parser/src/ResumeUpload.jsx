import React, { useState } from "react";
import axios from "axios";
import './App.css';

const ResumeUploader = () => {
  const [file, setFile] = useState(null);
  const [jobProfile, setJobProfile] = useState("");
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState(""); // Updated state for experience level and bracket

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !experience) {
      alert("Please upload a PDF file and select your experience level.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("experience", experience); // Add the selected experience level

    try {
      const response = await axios.post("http://127.0.0.1:8000/upload-resume/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setJobProfile(response.data.predicted_category);
      setSkills(response.data.top_skills);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to process the resume.");
    }
  };

  return (
    <div className="container">
      <h2>Resume Prediction</h2>
      <input type="file" accept=".pdf" onChange={handleFileChange} />

      {/* Dropdown for experience level with experience ranges */}
      <label htmlFor="experience">Select Experience Level:</label>
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

      <button onClick={handleUpload}>Upload Resume</button>

      {jobProfile && (
        <section>
          <h3>Predicted Job Profile:</h3>
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
    </div>
  );
};

export default ResumeUploader;
