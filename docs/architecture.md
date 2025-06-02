# DNDAI Architecture Overview

## High-Level Components

- **LLM Server (Flask, llm-server/):**
  - Hosts API endpoints for LLM, TTS, RAG management, and static demo UI.
  - Handles requests from the web UI and Foundry module.
  - Integrates with OpenRouter (LLM), ElevenLabs/gTTS (TTS), and ChromaDB (RAG, planned).

- **Demo UI (llm-server/demo/):**
  - Modern web interface for testing LLM, TTS, and RAG features.
  - Served directly by Flask backend.
  - Includes RAG management dashboard and multi-voice TTS tools.

- **RAG Data (llm-server/rag-data/):**
  - Stores ingested book chapters/notes as markdown files for retrieval-augmented generation.
  - Managed via CLI scripts and the web dashboard.

- **Foundry VTT Module (foundry-module/):**
  - (WIP) Integrates DNDAI features into Foundry Virtual Tabletop.

## Data Flow Diagram

```
[User/DM/Player]
      |
      v
[Demo UI] <----> [LLM Server (Flask API)] <----> [LLM, TTS, RAG Data]
      ^
      |
[Foundry VTT Module] (optional)
```

- The **Demo UI** and **Foundry module** both communicate with the Flask API.
- The **LLM Server** routes requests to LLMs, TTS providers, and RAG data as needed.
- All sensitive data (books, notes) stays on your server.

## Extensibility
- Modular design allows for new LLMs, TTS providers, and features to be added easily.
- RAG and TTS pipelines are designed for batch, scheduled, and manual workflows.

---
For more, see [api.md](./api.md) and the main [README.md](../README.md). 