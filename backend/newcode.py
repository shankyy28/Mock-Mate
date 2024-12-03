from fastapi import FastAPI, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import SVC
import joblib
import spacy
import string
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import PyPDF2
from io import BytesIO

# Load models and resources
nlp = spacy.load('en_core_web_sm')
loaded_classifier = joblib.load('svm_model.joblib')
loaded_vectorizer = joblib.load('tfidf_vectorizer.joblib')

stop_words = set(stopwords.words('english'))

technical_skills = [
    'python', 'java', 'c++', 'html', 'css', 'javascript', 'react', 'angular', 'django',
    'flask', 'docker', 'kubernetes', 'aws', 'azure', 'git', 'sql', 'mysql', 'postgresql',
    'mongodb', 'tensorflow', 'pytorch', 'keras', 'linux', 'bash', 'shell', 'scala', 'ruby',
    'hadoop', 'spark', 'pandas', 'numpy', 'scikit-learn', 'testing', 'automation', 'flutter',
    'communication', 'teamwork', 'leadership'
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def preprocess_resume(resume_text):
    resume_text = resume_text.lower()
    resume_text = resume_text.translate(str.maketrans('', '', string.punctuation))
    resume_text = word_tokenize(resume_text)
    resume_text = [word for word in resume_text if word not in stop_words]
    return resume_text

def extract_technical_skills(resume_tokens):
    skills_in_resume = [skill for skill in resume_tokens if skill in technical_skills]
    unique_skills = list(set(skills_in_resume))  # Remove duplicates
    return unique_skills[:10]  # Return the top 10 unique skills

def predict_job_profile(resume_text):
    preprocessed_resume = preprocess_resume(resume_text)
    resume_vectorized = loaded_vectorizer.transform([' '.join(preprocessed_resume)])
    predicted_category = loaded_classifier.predict(resume_vectorized)[0]
    return predicted_category

def extract_text_from_pdf(pdf_file):
    try:
        pdf_file_io = BytesIO(pdf_file)  # Convert raw content to a file-like object
        reader = PyPDF2.PdfReader(pdf_file_io)
        resume_text = ''
        for page in reader.pages:
            resume_text += page.extract_text() or ''  # Ensure we concatenate even if no text found
        return resume_text
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to read PDF: {e}")

@app.post("/upload-resume/")
async def upload_resume(file: UploadFile, experience: str = Form(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    pdf_content = await file.read()
    resume_text = extract_text_from_pdf(pdf_content)

    if not resume_text:
        raise HTTPException(status_code=400, detail="No text found in the resume.")

    resume_tokens = preprocess_resume(resume_text)
    predicted_category = predict_job_profile(' '.join(resume_tokens))
    top_technical_skills = extract_technical_skills(resume_tokens)

    # Parsing the experience level from the form (e.g., "fresher:<0")
    try:
        level, bracket = experience.split(":")
        print(f"Skills: {top_technical_skills}")
        print(f"Experience Level: {level}, Experience Bracket: {bracket}")
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid experience format.")

    # Optionally, you can add experience-specific logic to adjust the response or predictions
    # For now, we'll include the experience in the response
    return {
        "predicted_category": predicted_category,
        "top_skills": top_technical_skills,
        "experience_level": level,
        "experience_bracket": bracket
    }
