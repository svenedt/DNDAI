# DNDAI Troubleshooting Guide

This guide covers common issues and solutions for running and using DNDAI.

---

## Server Won't Start
- **Check Python version:** Ensure you're using Python 3.7+.
- **Check dependencies:** Run `pip install -r llm-server/requirements.txt`.
- **Check for port conflicts:** Make sure port 51234 is free.
- **Check `.env` file:** Ensure required API keys are present and valid.

---

## LLM or TTS Not Working
- **API keys:** Double-check your `OPENROUTER_API_KEY` and `ELEVENLABS_API_KEY` in `.env`.
- **Network issues:** Ensure your server can reach OpenRouter and ElevenLabs APIs.
- **Check Flask logs:** Look for error messages in the terminal where the server is running.
- **Debug log:** Use the debug panel in the demo UI to see what's being sent to TTS/LLM.

---

## RAG Ingestion Issues
- **PDF not found:** Make sure the PDF is in the correct `BOOKS_DIR`.
- **Ingestion script errors:** Check output of `ingest_rag.py` for errors.
- **Permissions:** Ensure the server has read/write access to `rag-data/` and `BOOKS_DIR`.

---

## UI Problems
- **404s for JS/CSS:** Make sure you're accessing the demo via `/` or `/demo/` on port 51234.
- **Browser cache:** Try a hard refresh (Ctrl+Shift+R).
- **Debug log:** Use the debug panel to see how input is parsed and processed.

---

## Tests Failing
- **Check dependencies:** Reinstall with `pip install -r llm-server/requirements.txt`.
- **Check Python version:** Use Python 3.7+.
- **Run tests from project root:** `cd llm-server && pytest`

---

## Getting Help
- **Check the docs:** See [user-guide.md](./user-guide.md) and [dev-guide.md](./dev-guide.md).
- **Open an issue:** If you're stuck, open a GitHub issue with details and logs.

---
For more, see [README.md](../README.md), [architecture.md](./architecture.md), and [api.md](./api.md). 