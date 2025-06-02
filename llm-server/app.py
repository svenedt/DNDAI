import os
import logging
from flask import Flask, request, jsonify, send_file, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
import requests
from io import BytesIO
from gtts import gTTS
import glob
import subprocess

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY")
BOOKS_DIR = os.getenv("BOOKS_DIR", "/mnt/user/dnd/DRIVE/Books")
RAG_DATA_DIR = os.getenv("RAG_DATA_DIR", "rag-data")

app = Flask(__name__)
CORS(app)

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
logger = logging.getLogger(__name__)


@app.route("/api/llm", methods=["POST"])
def llm():
    data = request.json
    prompt = data.get("prompt", "")
    persona = data.get("persona", "")
    rag_file = data.get("rag_file", None)
    logger.info(f"/api/llm called. Persona: {persona[:40]}... RAG: {rag_file}")
    # RAG: load context from file if provided
    context = ""
    if rag_file:
        try:
            with open(os.path.join(RAG_DATA_DIR, rag_file), "r") as f:
                context = f.read()
        except Exception as e:
            logger.error(f"Error loading RAG file {rag_file}: {e}")
            context = f"[Error loading RAG file: {e}]"
    # Compose system prompt
    system_prompt = persona
    if context:
        system_prompt += f"\nRAG Context:\n{context}"
    # Call OpenRouter
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": "openai/gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt},
        ],
    }
    try:
        resp = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            json=payload,
        )
        resp.raise_for_status()
        completion = resp.json()["choices"][0]["message"]["content"]
        logger.info("LLM completion successful.")
        return jsonify({"completion": completion, "context": context})
    except Exception as e:
        logger.error(f"LLM API error: {e}")
        return jsonify({"error": str(e)}), 500


@app.route("/api/tts", methods=["POST"])
def tts():
    data = request.json
    text = data.get("text", "")
    voice = data.get("voice", "")
    platform = data.get("platform", "gtts")
    logger.info(f"/api/tts called. Platform: {platform}, Voice: {voice}")
    if platform == "elevenlabs":
        # ElevenLabs API
        url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice}"
        headers = {
            "xi-api-key": ELEVENLABS_API_KEY,
            "Content-Type": "application/json",
        }
        payload = {
            "text": text,
            "voice_settings": {"stability": 0.5, "similarity_boost": 0.5},
        }
        try:
            resp = requests.post(url, headers=headers, json=payload)
            resp.raise_for_status()
            logger.info("TTS (ElevenLabs) audio generated.")
            return send_file(BytesIO(resp.content), mimetype="audio/mpeg")
        except Exception as e:
            logger.error(f"TTS ElevenLabs error: {e}")
            return jsonify({"error": str(e)}), 500
    else:
        # gTTS
        try:
            tts = gTTS(text)
            buf = BytesIO()
            tts.write_to_fp(buf)
            buf.seek(0)
            logger.info("TTS (gTTS) audio generated.")
            return send_file(buf, mimetype="audio/mpeg")
        except Exception as e:
            logger.error(f"TTS gTTS error: {e}")
            return jsonify({"error": str(e)}), 500


@app.route("/api/voices", methods=["GET"])
def voices():
    logger.info("/api/voices called.")
    # ElevenLabs voices
    url = "https://api.elevenlabs.io/v1/voices"
    headers = {"xi-api-key": ELEVENLABS_API_KEY}
    try:
        resp = requests.get(url, headers=headers)
        resp.raise_for_status()
        voices = resp.json().get("voices", [])
        return jsonify({"voices": voices})
    except Exception as e:
        return jsonify({"error": str(e), "voices": []}), 500


@app.route("/")
def root():
    return send_from_directory("demo", "index.html")


@app.route("/demo/<path:path>")
def send_demo(path):
    return send_from_directory("demo", path)


@app.route("/api/rag/books", methods=["GET"])
def rag_books():
    # List all PDFs in the source folder
    pdfs = glob.glob(os.path.join(BOOKS_DIR, "*.pdf"))
    return jsonify({"books": [os.path.basename(p) for p in pdfs]})


@app.route("/api/rag/ingested", methods=["GET"])
def rag_ingested():
    # List all .md files in rag-data
    mds = glob.glob(os.path.join(RAG_DATA_DIR, "*.md"))
    return jsonify({"chunks": [os.path.basename(m) for m in mds]})


@app.route("/api/rag/preview", methods=["GET"])
def rag_preview():
    # Return the content of a chunk for preview
    filename = request.args.get("file")
    if not filename or not filename.endswith(".md"):
        return jsonify({"error": "Invalid file"}), 400
    path = os.path.join(RAG_DATA_DIR, filename)
    if not os.path.exists(path):
        return jsonify({"error": "File not found"}), 404
    with open(path, "r", encoding="utf-8") as f:
        content = f.read(5000)  # Limit preview to 5k chars
    return jsonify({"content": content})


@app.route("/api/rag/ingest", methods=["POST"])
def rag_ingest():
    data = request.json or {}
    book = data.get("book")
    if not book or not book.lower().endswith(".pdf"):
        return (
            jsonify(
                {
                    "status": "Invalid or missing book filename",
                    "book": book,
                }
            ),
            400,
        )
    pdf_path = os.path.join(BOOKS_DIR, book)
    if not os.path.exists(pdf_path):
        return jsonify({"status": "Book not found", "book": book}), 404
    # Run the ingestion script as a subprocess (fire-and-forget)
    try:
        script_path = os.path.join(
            os.path.dirname(__file__), "scripts", "ingest_rag.py"
        )
        subprocess.Popen(["python3", script_path, pdf_path])
        print(f"[API] Started ingestion for {pdf_path}")
        return jsonify(
            {
                "status": f"Ingestion started for {book}",
                "book": book,
            }
        )
    except Exception as e:
        return jsonify({"status": f"Error: {e}", "book": book}), 500


@app.route("/pdfs/<path:filename>")
def serve_pdf(filename):
    # Serve PDF files from the book source directory
    return send_from_directory(BOOKS_DIR, filename)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=51234)
