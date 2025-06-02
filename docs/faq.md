# DNDAI FAQ

## General

**Q: What is DNDAI?**
A: DNDAI is an open-source, modular AI assistant for D&D and other TTRPGs, featuring LLM, TTS, and RAG integration. See [README.md](../README.md).

**Q: Is DNDAI free and open source?**
A: Yes! Licensed under MIT. You can use, modify, and contribute freely.

**Q: Can I use DNDAI commercially or in my own projects?**
A: Yes, subject to the MIT License.

---

## Setup & Usage

**Q: How do I get started?**
A: See [user-guide.md](./user-guide.md) and [dev-guide.md](./dev-guide.md) for setup and usage instructions.

**Q: Where do I put my API keys?**
A: In a `.env` file in `llm-server/`. See [llm-server/README.md](../llm-server/README.md).

**Q: How do I add new books for RAG?**
A: Place PDFs in your `BOOKS_DIR` and use the RAG management UI or CLI scripts to ingest them.

**Q: How do I tag text for TTS?**
A: Use `[NARRATIVE]`, `SPOKEN:`, `[INTERNAL]`, etc. See examples in the UI and [user-guide.md](./user-guide.md).

---

## Contribution

**Q: How do I contribute?**
A: Read [CONTRIBUTING.md](../CONTRIBUTING.md), open an issue or PR, and follow the code style and commit guidelines.

**Q: What's the code style?**
A: Python: PEP8. JS: Prettier/ESLint. See [dev-guide.md](./dev-guide.md).

**Q: How do I run tests?**
A: `cd llm-server && pytest`. See [dev-guide.md](./dev-guide.md).

---

## Troubleshooting

**Q: The server won't start / TTS/LLM isn't working!**
A: See [troubleshooting.md](./troubleshooting.md) for common issues and solutions.

**Q: How do I use the debug log?**
A: Expand the Debug Log panel in the demo UI to see how your input is parsed and processed.

**Q: Where can I get help?**
A: Check the docs, then open a GitHub issue with details and logs.

---
For more, see [README.md](../README.md), [user-guide.md](./user-guide.md), [dev-guide.md](./dev-guide.md), and [troubleshooting.md](./troubleshooting.md). 