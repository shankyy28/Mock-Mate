from flask import Flask, request, jsonify
import joblib
import os
import newcode  # Import your resume processing logic from newcode.py

app = Flask(__name__)
UPLOAD_FOLDER = 'backend/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load joblib models
svm_model = joblib.load("backend/svm.joblib")
tfidf_vectorizer = joblib.load("backend/tfidf.joblib")

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
    predicted_category, top_skills = newcode.process_resume(filepath, svm_model, tfidf_vectorizer, experience)

    # Clean up the uploaded file
    os.remove(filepath)

    return jsonify({
        "predicted_category": predicted_category,
        "top_skills": top_skills
    })

if __name__ == '__main__':
    app.run(debug=True, port=8000)
