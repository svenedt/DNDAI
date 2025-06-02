# DNDAI API Reference

This document describes the main API endpoints provided by the DNDAI Flask server.

---

## LLM & TTS Endpoints

### `POST /api/llm`
- **Description:** Get a response from the LLM (optionally with persona and RAG context).
- **Request JSON:**
  ```json
  {
    "prompt": "What is the rule for grappling?",
    "persona": "Gruff Dwarf Bartender",
    "rag_file": "example.md" // optional
  }
  ```
- **Response JSON:**
  ```json
  {
    "completion": "...LLM response...",
    "context": "...RAG context (if any)..."
  }
  ```

### `POST /api/tts`
- **Description:** Generate speech audio from text using TTS.
- **Request JSON:**
  ```json
  {
    "text": "Welcome, traveler!",
    "voice": "Rachel",
    "platform": "elevenlabs" // or "gtts"
  }
  ```
- **Response:**
  - Audio file (MPEG)

### `GET /api/voices`
- **Description:** List available TTS voices (from ElevenLabs).
- **Response JSON:**
  ```json
  {
    "voices": [ { "voice_id": "...", "name": "..." }, ... ]
  }
  ```

---

## RAG Management Endpoints

### `GET /api/rag/books`
- **Description:** List all source PDFs available for ingestion.
- **Response JSON:**
  ```json
  { "books": [ "DnD 5e Players Handbook.pdf", ... ] }
  ```

### `GET /api/rag/ingested`
- **Description:** List all ingested RAG markdown files.
- **Response JSON:**
  ```json
  { "chunks": [ "example.md", ... ] }
  ```

### `GET /api/rag/preview?file=example.md`
- **Description:** Preview the content of an ingested RAG file.
- **Response JSON:**
  ```json
  { "content": "...file content..." }
  ```

### `POST /api/rag/ingest`
- **Description:** Trigger ingestion of a PDF (manual/batch).
- **Request JSON:**
  ```json
  { "book": "DnD 5e Players Handbook.pdf" }
  ```
- **Response JSON:**
  ```json
  { "status": "Ingestion started for ...", "book": "..." }
  ```

---

## PDF Serving

### `GET /pdfs/<filename>`
- **Description:** Serve a PDF file from the books directory for in-browser viewing.
- **Response:**
  - PDF file

---
For more details, see the main [README.md](../README.md) and [architecture.md](./architecture.md). 