import React, { useState } from "react";
import axios from "axios";

const WhisperRecorder = ({ onTranscription }) => {
  const [recording, setRecording] = useState(false);

  const handleRecord = () => {
    setRecording(true);
    setTimeout(async () => {
      const mockAudioBlob = new Blob(); // Replace with actual audio blob from recording
      const formData = new FormData();
      formData.append("audio", mockAudioBlob);

      try {
        const response = await axios.post("http://127.0.0.1:5000/whisper", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        onTranscription(response.data.transcription);
      } catch (error) {
        console.error("Error transcribing audio:", error);
      }
      setRecording(false);
    }, 5000); // Simulate 5 seconds of recording
  };

  return (
    <div>
      <button
        onClick={handleRecord}
        disabled={recording}
        style={{
          backgroundColor: recording ? "#ccc" : "#007bff",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: recording ? "not-allowed" : "pointer",
        }}
      >
        {recording ? "Recording..." : "Record Answer"}
      </button>
    </div>
  );
};

export default WhisperRecorder;