# DNDAI: D&D AI Modular Project

## Overview
DNDAI is a modular AI-powered D&D assistant with:
- A Flask-based LLM server (OpenRouter + ElevenLabs TTS integration)
- Modern web demo UI (served by Flask)
- Foundry VTT module (WIP)
- **RAG Management Dashboard**: In-browser management of book ingestion, preview, and PDF viewing

## Quick Start

### 1. Clone and Install
```bash
git clone <repo-url>
cd DNDAI
pip install -r llm-server/requirements.txt
```

### 2. Configure API Keys
Create a `.env` file in `llm-server/` with:
```
OPENROUTER_API_KEY=sk-...
ELEVENLABS_API_KEY=...
```

### 3. Run the Server
```bash
cd llm-server
python3 app.py
```
- The server runs on **port 51234** by default.
- Both API and frontend are served from Flask.

### 4. Access the Demo UI
Open in your browser:
- http://<your-server-ip>:51234/

### 5. Features
- LLM prompt/response (OpenRouter)
- Persona selector
- RAG file input (optional)
- TTS (gTTS or ElevenLabs, with dynamic voice list)
- Audio playback
- **RAG Management**: List, preview, and ingest books; view PDFs in-browser

## RAG Management
- Access the RAG Management section at the bottom of the demo UI
- List all PDFs in your source folder
- Preview ingested chapters and view PDFs in-browser
- Trigger ingestion (stub for now)
- See `RAG-operations.md` for CLI and automation

## Development
- All static files are in `llm-server/demo/` and served by Flask.
- API endpoints: `/api/llm`, `/api/tts`, `/api/voices`, `/api/rag/books`, `/api/rag/ingested`, `/api/rag/preview`, `/pdfs/<filename>`
- To add new RAG files, place them in `llm-server/rag-data/`.

## Testing
```bash
cd llm-server
pytest
```

## Troubleshooting
- If voices or TTS do not work, check your `.env` keys and Flask logs.
- If you see 404s for JS/CSS, ensure you access the demo via `/` or `/demo/` on port 51234.

---
For more, see `AI-Assisted-DND-MCP-Plan.md`, `ROADMAP.md`, and `RAG-operations.md`.
