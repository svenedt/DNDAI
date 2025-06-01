# LLM Server (Skeleton)

This is a minimal Python Flask server for the DNDAI project. It currently provides a simple echo endpoint for development and testing.

## Setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. (Optional) Create a `.env` file in this directory to configure API keys and directories:
   ```env
   OPENROUTER_API_KEY=your_openrouter_key
   ELEVENLABS_API_KEY=your_elevenlabs_key
   # Optional: override these if your books or rag-data are elsewhere
   BOOKS_DIR=/mnt/user/dnd/DRIVE/Books
   RAG_DATA_DIR=llm-server/rag-data
   ```
   - `BOOKS_DIR`: Directory containing source PDFs for ingestion (default: `/mnt/user/dnd/DRIVE/Books`)
   - `RAG_DATA_DIR`: Directory for ingested RAG markdown files (default: `llm-server/rag-data`)

3. Run the server:
   ```bash
   python app.py
   ```

## API
- **POST /api/llm**
  - Request body: JSON
  - Response: `{ "echo": <your input JSON> }`

This server will be expanded to support LLM calls and advanced features as development progresses.

## Testing

1. Install `pytest` if you haven't already:
   ```bash
   pip install pytest
   ```
2. Run the test:
   ```bash
   pytest llm-server/tests/test_api.py
   ```

If you see import errors, ensure you are running the test from the project root and that your Python version is 3.7+.

## Advanced Multi-Voice, Multi-Persona, and Narrative Tagging Roadmap

**Vision:**
- Enable Baldur's Gate 3-style narration and immersive AI-driven scenes with multiple characters, voices, and narrative/emote tagging.

**Planned Features:**
- **Input Tagging:** Allow users to highlight/select portions of text and tag as "Narrative" (narrator voice), "Spoken" (dialogue, by character), or "Internal/Whisper" (thoughts, special voice or text-only).
- **Persona-to-Voice Mapping:** Assign TTS voices to each persona/character, including a dedicated narrator voice.
- **Batch TTS Playback:** Parse LLM output into segments by tag/persona and play them in sequence, switching voices as needed. Support "Play All" and per-segment playback.
- **Emote/Narration System:** Narrator voice reads all emotes, scene descriptions, and meta, while NPCs/players have their own voices for dialogue.
- **Internal Thought Handling:** Tag and optionally play internal thoughts in a "whisper" voice or display as text only.
- **UI/UX for Many Characters:** Explore whether to use multiple text boxes, tagging per line, or a dynamic character/persona selector to handle scenes with many characters efficiently.
- **Player/DM Workflow:** Make it easy for players/DMs to input, tag, and send complex scene text, and for the LLM to respond in a structured, multi-voice format.

**Next Steps:**
- Document and design the technical and user experience strategy for these features before implementation.
- Prioritize based on technical feasibility, user value, and integration with existing LLM/TTS flows.

*This section is a living roadmap for the next generation of immersive, multi-voice, AI-powered tabletop experiences!* 