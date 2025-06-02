import os
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import subprocess
from dotenv import load_dotenv
import logging

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
logger = logging.getLogger(__name__)

load_dotenv()

BOOKS_DIR = os.getenv("BOOKS_DIR", "/mnt/user/dnd/DRIVE/Books")
RAG_DATA_DIR = os.getenv("RAG_DATA_DIR", "../rag-data/")
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
INGEST_SCRIPT = os.path.join(SCRIPT_DIR, "ingest_rag.py")


# Helper: get set of already ingested PDFs (by filename, ignoring extension)
def get_ingested_basenames():
    md_files = [f for f in os.listdir(RAG_DATA_DIR) if f.endswith(".md")]
    return set(os.path.splitext(f)[0].lower() for f in md_files)


def pdf_basename(pdf_path):
    return os.path.splitext(os.path.basename(pdf_path))[0].lower()


class PDFHandler(FileSystemEventHandler):
    def on_created(self, event):
        if not event.is_directory and event.src_path.lower().endswith(".pdf"):
            basename = pdf_basename(event.src_path)
            ingested = get_ingested_basenames()
            if basename in ingested:
                logger.info(f"PDF {event.src_path} already ingested, skipping.")
                return
            logger.info(f"New PDF detected: {event.src_path}. Starting ingestion...")
            try:
                subprocess.Popen(
                    [
                        "python3",
                        INGEST_SCRIPT,
                        event.src_path,
                    ]
                )
                logger.info(f"Ingestion subprocess started for {event.src_path}")
            except Exception as e:
                logger.error(f"Error starting ingestion for {event.src_path}: {e}")


if __name__ == "__main__":
    logger.info(f"[auto-ingest] Watching {BOOKS_DIR} for new PDFs...")
    event_handler = PDFHandler()
    observer = Observer()
    observer.schedule(event_handler, BOOKS_DIR, recursive=False)
    observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        logger.info("[auto-ingest] Stopping PDF watcher.")
        observer.stop()
    observer.join()
