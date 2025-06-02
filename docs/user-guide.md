# DNDAI User Guide

This guide explains how to use the DNDAI demo UI and its main features.

---

## Accessing the Demo UI

- Start the server (`python3 app.py` in `llm-server/`).
- Open your browser to `http://localhost:51234/` (or your server's IP).

---

## Accessibility

- The demo UI includes ARIA roles, keyboard navigation, and accessible debug log and modal dialogs.
- Please report any accessibility issues or suggestions.

---

## How the Demo UI Communicates with the Backend

```mermaid
graph TD
  User[User (Browser)]
  UI[Demo UI]
  Server[LLM Server (Flask API)]
  LLM[LLM (OpenRouter)]
  TTS[TTS (ElevenLabs/gTTS)]
  RAG[RAG Data]

  User --> UI
  UI <--> Server
  Server --> LLM
  Server --> TTS
  Server --> RAG
```

See [architecture.md](./architecture.md) for more system diagrams.

---

## LLM (Language Model) Features

- Enter a prompt in the LLM section (e.g., "Describe the innkeeper.").
- Select a persona or enter a custom one for in-character responses.
- (Optional) Specify a RAG file for book-accurate answers.
- Click **Send** to get a response from the AI.

---

## TTS (Text-to-Speech)

- Enter text in the TTS box (or use the **Send to TTS** button from LLM output).
- Assign voices for Narrative, Spoken, and Internal/Whisper tags.
- Use tags like `[NARRATIVE]`, `SPOKEN:`, or `[INTERNAL]` to control voices.
- Click **Generate Speech** to hear the output.
- Use the debug log to see how your input is parsed and which voices are used.

---

## RAG Management

- Scroll to the RAG Management section in the UI.
- List available books (PDFs) and ingested chapters.
- Preview or ingest new content as needed.
- View PDFs in-browser for reference.

---

## Tips for Best Results

- Use clear tags for TTS (see examples in the UI).
- Assign voices to match your scene (e.g., narrator, NPC, player).
- For LLM, provide context or persona for more immersive responses.
- Use the debug log for troubleshooting parsing or voice assignment issues.

---

## Troubleshooting

- If TTS or LLM features don't work, check your API keys in `.env`.
- Use the debug log and Flask server logs for error details.
- See [dev-guide.md](./dev-guide.md) for more debugging tips.

---

For more, see [architecture.md](./architecture.md), [api.md](./api.md), and the main [README.md](../README.md).
