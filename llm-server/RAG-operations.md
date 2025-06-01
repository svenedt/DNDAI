# RAG Operations & Management

This page documents how to run, schedule, tune, and quality-control your RAG (Retrieval-Augmented Generation) ingestion pipeline for RPG books and similar content.

---

## 1. Running RAG Ingestion

- **Single Book:**
  ```bash
  cd llm-server/scripts
  python3 ingest_rag.py  # Edit PDF_PATH in the script for each book
  ```
- **All Books (future):**
  - (Planned) Use a script to process all PDFs in a folder automatically.

---

## 2. Scheduling RAG Ingestion

- **With cron (example, daily at 2am):**
  ```cron
  0 2 * * * cd /mnt/user/DNDAI/llm-server/scripts && python3 ingest_rag.py
  ```
- Or use a task scheduler of your choice.

---

## 3. Tuning RAG Chunking

- Adjust chunk size, regex, or splitting logic in `ingest_rag.py`.
- See `rag-chunking-guidelines.md` for best practices and open questions.
- Re-run the script after tuning to re-chunk books.

---

## 4. Book Status Dashboard

- **List all PDFs ready for ingestion:**
  ```bash
  ls /mnt/user/dnd/DRIVE/Books/*.pdf
  ```
- **List all ingested chapters:**
  ```bash
  ls llm-server/rag-data/*.md
  ```
- **See which books are ingested:**
  - Compare PDF filenames to `.md` files in `rag-data/`.
- **In-browser Management UI:**
  - Use the RAG Management section in the demo UI to list, preview, and ingest books, and view PDFs in-browser.
  - API endpoints: `/api/rag/books`, `/api/rag/ingested`, `/api/rag/preview`, `/pdfs/<filename>`

---

## 5. Quality Control (QC)

- **Preview a random chunk:**
  ```bash
  shuf -n 1 -e llm-server/rag-data/*.md | xargs head -40
  ```
- **Preview a specific chapter:**
  ```bash
  head -40 llm-server/rag-data/Chapter_1_Step_by_Step_Characters.md
  ```
- **Check word count:**
  ```bash
  wc -w llm-server/rag-data/*.md
  ```

---

## 6. (Optional) Future UI/Automation

- Web dashboard for RAG management (list, preview, re-ingest, QC, etc.)
- CLI tool for batch operations and reporting

---

*Update this page as your workflow evolves!* 