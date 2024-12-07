from flask import Flask, request, jsonify
from use_model import InterviewQuestionGenerator  # Confirm this path is correct

app = Flask(__name__)
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

if __name__ == "__main__":
    app.run(port=8000, debug=True)
