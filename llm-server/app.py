import os
from flask import Flask, request, jsonify, send_file, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
import requests
from io import BytesIO
from gtts import gTTS

load_dotenv()

OPENROUTER_API_KEY = os.getenv('OPENROUTER_API_KEY')
ELEVENLABS_API_KEY = os.getenv('ELEVENLABS_API_KEY')

app = Flask(__name__)
CORS(app)

@app.route('/api/llm', methods=['POST'])
def llm():
    data = request.json
    prompt = data.get('prompt', '')
    persona = data.get('persona', '')
    rag_file = data.get('rag_file', None)
    # RAG: load context from file if provided
    context = ''
    if rag_file:
        try:
            with open(f'rag-data/{rag_file}', 'r') as f:
                context = f.read()
        except Exception as e:
            context = f"[Error loading RAG file: {e}]"
    # Compose system prompt
    system_prompt = persona
    if context:
        system_prompt += f"\nRAG Context:\n{context}"
    # Call OpenRouter
    headers = {
        'Authorization': f'Bearer {OPENROUTER_API_KEY}',
        'Content-Type': 'application/json',
    }
    payload = {
        'model': 'openai/gpt-3.5-turbo',
        'messages': [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt}
        ]
    }
    try:
        resp = requests.post('https://openrouter.ai/api/v1/chat/completions', headers=headers, json=payload)
        resp.raise_for_status()
        completion = resp.json()['choices'][0]['message']['content']
        return jsonify({"completion": completion, "context": context})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/tts', methods=['POST'])
def tts():
    data = request.json
    text = data.get('text', '')
    voice = data.get('voice', '')
    platform = data.get('platform', 'gtts')
    if platform == 'elevenlabs':
        # ElevenLabs API
        url = f'https://api.elevenlabs.io/v1/text-to-speech/{voice}'
        headers = {
            'xi-api-key': ELEVENLABS_API_KEY,
            'Content-Type': 'application/json',
        }
        payload = {"text": text, "voice_settings": {"stability": 0.5, "similarity_boost": 0.5}}
        try:
            resp = requests.post(url, headers=headers, json=payload)
            resp.raise_for_status()
            return send_file(BytesIO(resp.content), mimetype='audio/mpeg')
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    else:
        # gTTS
        try:
            tts = gTTS(text)
            buf = BytesIO()
            tts.write_to_fp(buf)
            buf.seek(0)
            return send_file(buf, mimetype='audio/mpeg')
        except Exception as e:
            return jsonify({"error": str(e)}), 500

@app.route('/api/voices', methods=['GET'])
def voices():
    # ElevenLabs voices
    url = 'https://api.elevenlabs.io/v1/voices'
    headers = {'xi-api-key': ELEVENLABS_API_KEY}
    try:
        resp = requests.get(url, headers=headers)
        resp.raise_for_status()
        voices = resp.json().get('voices', [])
        return jsonify({"voices": voices})
    except Exception as e:
        return jsonify({"error": str(e), "voices": []}), 500

@app.route('/')
def root():
    return send_from_directory('demo', 'index.html')

@app.route('/demo/<path:path>')
def send_demo(path):
    return send_from_directory('demo', path)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=51234) 