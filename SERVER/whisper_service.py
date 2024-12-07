from flask import Flask, request, jsonify
import whisper

app = Flask(__name__)
model = whisper.load_model("base")

def transcribe_audio():
    audio_file = request.files["audio"]
    transcription = model.transcribe(audio_file)["text"]
    return jsonify({"transcription": transcription})
