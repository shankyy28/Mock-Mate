from flask import Flask, request, jsonify
import os
from resume_parser import process_resume  # Import your resume processing logic from newcode.py 
from use_model import InterviewQuestionGenerator
from load_whisper import load_whisper

app = Flask(__name__)
UPLOAD_FOLDER = 'backend/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
whisper_model = load_whisper()

# Loading llama service
generator = InterviewQuestionGenerator()

@app.route("/whisper", methods=["POST"])
def transcribe_audio():
    audio_file = request.files["audio"]
    transcription = whisper_model.transcribe(audio_file)["text"]
    return jsonify({"transcription": transcription})

@app.route("/start-interview", methods=["POST"])
def start_interview():
    try:
        data = request.json
        resume_pdf = data["resume_pdf"]
        job_role = data["job_role"]
        experience_level = data["experience_level"]

        skills = process_resume(resume_pdf)
        
        questions = generator.generate_questions(job_role, skills, experience_level)
        return jsonify({"questions": questions})
    except KeyError as e:
        return jsonify({"error": f"Missing parameter: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/llama/evaluate_responses", methods=["POST"])
def evaluate_responses():
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
