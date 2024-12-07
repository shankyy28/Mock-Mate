from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from resume_parser import process_resume  # Import your resume processing logic from newcode.py 
from use_model import InterviewQuestionGenerator
from load_whisper import load_whisper

app = Flask(__name__)
CORS(app)
whisper_model = load_whisper()

# Loading llama service
generator = InterviewQuestionGenerator()

@app.route("/", methods=["POST", "GET"])
def index():
    print("index")
    return jsonify({"Project": "MockMate"})

@app.route("/whisper", methods=["POST", "GET"])
def transcribe_audio():
    print("whisper")
    audio_file = request.files["audio"]
    transcription = whisper_model.transcribe(audio_file)["text"]
    return jsonify({"transcription": transcription})

@app.route("/start-interview", methods=["POST", "GET"])
def start_interview():
    print("start-interview")
    try:
        if "resume_pdf" not in request.files:
            return jsonify({"error": "No resume file provided"}), 400

        file = request.files["resume_pdf"]
        experience_level = request.form.get("experience")
        job_role = request.form.get("job_profile")

        if not experience_level:
            return jsonify({"error": "Experience level not provided"}), 400

        # Debug log for file type
        print(f"File received: {file.filename}, Experience Level: {experience_level}")

        skills = process_resume(file)

        questions = generator.generate_questions(job_role, skills, experience_level)
        print(questions)
        return jsonify({"job_role": job_role, "skills": skills, "questions": questions})
    except Exception as e:
        print("Error during file handling:", str(e))
        return jsonify({"error": str(e)}), 500


@app.route("/llama/evaluate_responses", methods=["POST", "GET"])
def evaluate_responses():
    print("evaluate-responses")
    try:
        data = request.json
        questions = data["questions"]
        responses = data["responses"]

        feedback = generator.evaluate_responses(questions, responses)
        return jsonify({"feedback": feedback})
    except KeyError as e:
        return jsonify({"error": f"Missing parameter: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8000)
