# DNDAI Advanced Usage Guide

This guide covers advanced features and workflows for power users and DMs.

See diagrams below for batch RAG and multi-voice TTS workflows.

---

## Batch & Scheduled RAG Ingestion

- Use `llm-server/scripts/ingest_rag.py --all` to ingest all PDFs in your books directory at once.
- Use `llm-server/scripts/auto_ingest_watchdog.py` to automatically ingest new PDFs as they appear (requires `watchdog` package).
- Schedule ingestion scripts with cron or a task scheduler for regular updates.
- See [RAG-operations.md](../llm-server/RAG-operations.md) for more.

---

## Diagrams: Batch RAG Ingestion & Multi-Voice TTS

### Batch/Scheduled RAG Ingestion

```mermaid
graph TD
  PDF[PDFs in Books Directory]
  Watchdog[Watchdog Script]
  Ingest[Ingestion Script]
  RAG[RAG Data]

  PDF --> Watchdog
  Watchdog --> Ingest
  Ingest --> RAG
```

### Multi-Voice TTS Scripting

```mermaid
graph TD
  Script[Scripted Text with Tags]
  Parse[Tag Parser]
  Assign[Voice Assignment]
  TTSAPI[TTS API]
  Audio[Audio Playback]

  Script --> Parse --> Assign --> TTSAPI --> Audio
```

---

## Custom Persona Prompts

- Use the persona selector or enter a custom persona/system prompt for the LLM.
- Example: `You are a gruff dwarven bartender. Respond in character.`
- Combine with RAG files for book-accurate, in-character responses.

---

## Integration Tips

- The Flask API can be called from other tools, bots, or VTT modules.
- See [api.md](./api.md) for endpoint details and examples.
- The Foundry VTT module (WIP) will enable in-game AI and TTS features.

---

For more, see [dev-guide.md](./dev-guide.md), [user-guide.md](./user-guide.md), and [architecture.md](./architecture.md).
