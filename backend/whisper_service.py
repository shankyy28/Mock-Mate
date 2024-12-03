from flask import Flask, request, jsonify
import whisper

app = Flask(__name__)
model = whisper.load_model("base")

@app.route("/whisper/transcribe", methods=["POST"])
def transcribe_audio():
    audio_file = request.files["audio"]
    transcription = model.transcribe(audio_file)["text"]
    return jsonify({"transcription": transcription})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
