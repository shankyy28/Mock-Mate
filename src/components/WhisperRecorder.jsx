import React, { useState, useRef } from "react";
import axios from "axios";

const WhisperRecorder = ({ onTranscription }) => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  const handleRecord = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Audio recording not supported in this browser.");
      return;
    }

    setRecording(true);
    audioChunks.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = event => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
        setAudioBlob(audioBlob);

        // Create FormData and send audio to the Whisper service
        const formData = new FormData();
        formData.append("audio", audioBlob);

        try {
          const response = await axios.post("http://127.0.0.1:5000/whisper/transcribe", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          onTranscription(response.data.transcription);
        } catch (error) {
          console.error("Error transcribing audio:", error);
        }

        setRecording(false);
      };

      mediaRecorderRef.current.start();
    } catch (error) {
      console.error("Error accessing the microphone:", error);
      setRecording(false);
    }
  };

  const handleStop = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
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
      {recording && (
        <button
          onClick={handleStop}
          style={{
            marginLeft: "10px",
            backgroundColor: "#dc3545",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Stop Recording
        </button>
      )}
    </div>
  );
};

export default WhisperRecorder;
