# DNDAI: D&D AI Modular Project

[![Build Status](https://github.com/svenedt/DNDAI/actions/workflows/python-app.yml/badge.svg)](https://github.com/svenedt/DNDAI/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Docs](https://img.shields.io/badge/docs-available-brightgreen)](docs/)
[![Python](https://img.shields.io/badge/python-3.10%2B-blue.svg)](https://www.python.org/downloads/)
[![Last Commit](https://img.shields.io/github/last-commit/svenedt/DNDAI.svg)](https://github.com/svenedt/DNDAI/commits/main)

## What is DNDAI?

**DNDAI** is a next-generation, open-source platform that brings the power of modern AI to your Dungeons & Dragons (and other TTRPG) table. It's not just a chatbot or a rules lookup tool—it's a modular, extensible "AI co-DM" system designed to make your games more immersive, creative, and fun, while always keeping the Dungeon Master in control.

## Why is DNDAI Great?

- **AI as Your Co-DM, Not Your Replacement:**  
  DNDAI is built for DMs, not to replace them. The AI can suggest NPC dialogue, generate creative descriptions, answer rules questions, and more—but the DM always has the final say, with approval workflows and meta-chat for behind-the-scenes collaboration.

- **Modular, Extensible, and Privacy-First:**  
  Every table is different. DNDAI is designed to be modular: swap in your favorite LLMs, TTS providers, or even add new features like lighting control or AI art. All your private content (like book PDFs) stays on your server—nothing is sent to third parties unless you choose.

- **Supercharge Your Tabletop Experience:**  
  - **LLM Integration:** Get instant, in-character NPC responses, creative ideas, and rules clarifications from state-of-the-art language models.
  - **TTS (Text-to-Speech):** Bring your world to life with expressive, multi-voice narration using ElevenLabs or Google TTS.
  - **Retrieval-Augmented Generation (RAG):** Ask questions and get answers sourced directly from your own books, notes, or campaign materials—no more flipping through rulebooks!
  - **Foundry VTT Integration (WIP):** Seamlessly use AI features inside your favorite virtual tabletop.
  - **RAG Management Dashboard:** Ingest, preview, and manage your book content right from the browser.

- **For DMs, By DMs:**  
  DNDAI is built with real table needs in mind: undo/rewind, speaker tracking, campaign state management, and more are on the roadmap. The goal is to empower DMs and players, not automate away the magic of the game.

- **Open Source, Community-Driven:**  
  We believe the best tools are built together. DNDAI is open for contributions, feedback, and new ideas—join us in shaping the future of AI-assisted tabletop gaming!

## Example Use Cases

- Instantly generate in-character dialogue for any NPC, with the DM able to edit or approve before it's spoken.
- Ask "What's the rule for grappling?" and get a sourced, book-accurate answer—plus a page reference.
- Use TTS to narrate boxed text, monster taunts, or environmental effects in a variety of voices.
- Manage your own campaign notes, homebrew content, and official books in a private, searchable RAG database.
- (Soon) Integrate with Foundry VTT for in-game AI chat, TTS, and more.

## Vision
DNDAI is an open, modular platform to supercharge tabletop role-playing games with AI. Our goal is to create an immersive, DM-controlled D&D experience by integrating:
- **LLMs** for on-the-fly NPC dialogue, rules lookups, and creative prompts
- **Text-to-Speech (TTS)** for dynamic, expressive narration and character voices
- **Retrieval-Augmented Generation (RAG)** for context-aware answers using your own books and notes
- **Foundry VTT integration** for seamless in-game use
- **DM Approval & Co-DM Workflow** so the human DM always has the final say
- **Extensible, privacy-first design**: add new AI models, TTS providers, or automation as you wish

Whether you want to run smarter NPCs, automate rules Q&A, or create a fully AI-assisted campaign, DNDAI gives you the tools—while keeping the DM in control.

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

## New Features (June 2025)
- **Robust tag parsing:** The TTS demo now supports a wide variety of tag styles (e.g., [NARRATIVE], [NARRATIVE:], NARRATIVE:, etc.) and strips all tags before sending text to TTS.
- **Debug Log:** A collapsible debug panel in the UI shows exactly how your input is parsed, tagged, and assigned to voices—making troubleshooting easy.
- **Persistent voice settings:** Your TTS platform and voice assignments are saved across page refreshes for a smoother workflow.

---
For more, see `AI-Assisted-DND-MCP-Plan.md`, `ROADMAP.md`, and `RAG-operations.md`.
