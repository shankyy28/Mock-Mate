from flask import Flask, request, jsonify
import os
import resume_parser as resume_parser  # Import your resume processing logic from newcode.py 
from use_model import InterviewQuestionGenerator

app = Flask(__name__)
UPLOAD_FOLDER = 'backend/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Loading llama service
generator = InterviewQuestionGenerator()

@app.route("/llama/generate_questions", methods=["POST"])
def generate_questions():
    try:
        data = request.json
        job_role = data["job_role"]
        skills = data["skills"]
        experience_level = data["experience_level"]
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

@app.route('/upload-resume/', methods=['POST'])
def upload_resume():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']
    experience = request.form.get('experience')

    if file.filename == '':
        return jsonify({"error": "No file selected for uploading"}), 400

    if not file.filename.endswith('.pdf'):
        return jsonify({"error": "Only PDF files are allowed"}), 400

    # Save the uploaded file
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    # Process the resume with `newcode.py` and additional experience parameter
    predicted_category, top_skills = resume_parser.process_resume(filepath, experience)

    # Clean up the uploaded file
    os.remove(filepath)

    return jsonify({
        "predicted_category": predicted_category,
        "top_skills": top_skills
    })

if __name__ == '__main__':
    app.run(debug=True, port=8000)
