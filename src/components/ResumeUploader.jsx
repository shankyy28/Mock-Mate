import React, { useState } from "react";
import axios from "axios";
import './App.css';

const ResumeUploader = ({ onResumeParsed }) => {
  const [file, setFile] = useState(null);
  const [jobProfile, setJobProfile] = useState("");
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

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
    formData.append("experience", experience);

    setLoading(true);
    setUploadStatus("Uploading...");

    try {
      const response = await axios.post("http://127.0.0.1:8000/upload-resume/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Update the state with parsed data from response
      setJobProfile(response.data.predicted_category);
      setSkills(response.data.top_skills);
      setUploadStatus("Upload Successful! Parsing complete.");

      // Notify the parent component after processing
      setTimeout(() => {
        onResumeParsed();
      }, 2000);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to process the resume. Please try again.");
      setUploadStatus("Upload Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Resume Prediction</h2>
      <input type="file" accept=".pdf" onChange={handleFileChange} />

      {/* Dropdown for experience level */}
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

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload Resume"}
      </button>

      {/* Status message for upload */}
      {uploadStatus && (
        <div className="upload-status">
          <p>{uploadStatus}</p>
        </div>
      )}

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
