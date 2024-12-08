from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from resume_parser import process_resume  # Import your resume processing logic from newcode.py 
from use_model import InterviewQuestionGenerator
from load_whisper import load_whisper

app = Flask(__name__)
CORS(app)
whisper_model = load_whisper()

store_questions = []
answers = []

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

@app.route("/resume-parser", methods=["POST", "GET"])
def resumeparser():
    print("resume-parser")
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

        store_questions.append(generator.generate_questions(job_role, skills, experience_level))

        return jsonify({"job_role": job_role, "skills": skills})
    except Exception as e:
        print("Error during file handling:", str(e))
        return jsonify({"error": str(e)}), 500

@app.route("/fetch-questions", methods=["GET"])
def fetch_questions():
    print("fetch-questions")
    try:
        questions = store_questions[-1]

        return jsonify({"questions": questions})
    except Exception as e:
        print("Error during questions fetching:", str(e))
        return jsonify({"error": str(e)}), 500
    
@app.route("/store-answers", methods=["POST", "GET"])
def store_answers():
    print("store-answers")
    try:
        data = request.data
        answers.append(str(data["answers"]))
    except Exception as e:
        print("Error during storing answer:", str(e))
        return jsonify({"error": str(e)}), 500

@app.route("/evaluate_responses", methods=["POST", "GET"])
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
