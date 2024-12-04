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
spacy.cli.download("en_core_web_sm")
nlp = spacy.load('en_core_web_sm')
loaded_classifier = joblib.load('backend/svm_model.joblib')
loaded_vectorizer = joblib.load('backend/tfidf_vectorizer.joblib')

stop_words = set(stopwords.words('english'))

technical_skills = [
    'python', 'java', 'c++', 'html', 'css', 'javascript', 'react', 'angular', 'django',
    'flask', 'docker', 'kubernetes', 'aws', 'azure', 'git', 'sql', 'mysql', 'postgresql',
    'mongodb', 'tensorflow', 'pytorch', 'keras', 'linux', 'bash', 'shell', 'scala', 'ruby',
    'hadoop', 'spark', 'pandas', 'numpy', 'scikit-learn', 'testing', 'automation', 'flutter',
    'communication', 'teamwork', 'leadership'
]

def preprocess_resume(resume_text):
    resume_text = resume_text.lower()
    resume_text = resume_text.translate(str.maketrans('', '', string.punctuation))
    resume_text = word_tokenize(resume_text)
    resume_text = [word for word in resume_text if word not in stop_words]
    return resume_text

def extract_technical_skills(resume_tokens):
    skills_in_resume = [skill for skill in resume_tokens if skill in technical_skills]
    unique_skills = list(set(skills_in_resume))  # Remove duplicates
    return unique_skills[:4]  # Return the top 4 unique skills

def extract_text_from_pdf(pdf_file):
    pdf_file_io = BytesIO(pdf_file)  # Convert raw content to a file-like object
    reader = PyPDF2.PdfReader(pdf_file_io)
    resume_text = ''
    for page in reader.pages:
        resume_text += page.extract_text() or ''  # Ensure we concatenate even if no text found
    return resume_text

def process_resume(file):
    pdf_content = file.read()
    resume_text = extract_text_from_pdf(pdf_content)

    resume_tokens = preprocess_resume(resume_text)
    top_technical_skills = extract_technical_skills(resume_tokens)

    return top_technical_skills
