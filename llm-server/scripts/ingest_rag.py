import os
import re
import sys
import glob
import pdfplumber
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# CONFIG (now from environment variables)
BOOKS_DIR = os.getenv("BOOKS_DIR", "/mnt/user/dnd/DRIVE/Books")
RAG_DATA_DIR = os.getenv("RAG_DATA_DIR", "../rag-data/")
DEFAULT_PDF = os.getenv(
    "PDF_PATH",
    os.path.join(BOOKS_DIR, "DnD 5e Players Handbook (BnW OCR).pdf"),
)
CHAPTER_REGEX = re.compile(r"(Chapter\s*\d+[:\.]?\s*[\w\s\-]*)", re.IGNORECASE)

# Helper to ingest a single PDF


def ingest_pdf(PDF_PATH, OUTPUT_DIR):
    print(f"Ingesting PDF: {PDF_PATH}")
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    with pdfplumber.open(PDF_PATH) as pdf:
        chapters = []
        current = {"title": None, "start": 0}
        for i, page in enumerate(pdf.pages):
            text = page.extract_text()
            if not text:
                continue
            for line in text.split("\n"):
                match = CHAPTER_REGEX.match(line.strip())
                if match:
                    if current["title"]:
                        current["end"] = i - 1
                        chapters.append(current)
                    current = {"title": match.group(1).strip(), "start": i}
        if current["title"]:
            current["end"] = len(pdf.pages) - 1
            chapters.append(current)

        print(f"Found {len(chapters)} chapters:")
        for c in chapters:
            print(f"{c['title']} (pages {c['start']+1}-{c['end']+1})")

        # Extract and save each chapter
        for c in chapters:
            text = ""
            for i in range(c["start"], c["end"] + 1):
                page_text = pdf.pages[i].extract_text()
                if page_text:
                    text += page_text + "\n"
            # Save as markdown
            safe_title = re.sub(r"[^\w\-]+", "_", c["title"]).strip("_")
            out_path = os.path.join(OUTPUT_DIR, f"{safe_title}.md")
            with open(out_path, "w", encoding="utf-8") as f:
                f.write(f'# {c["title"]}\n')
                f.write(
                    f'\n(Source: {PDF_PATH}, pages {c["start"]+1}-{c["end"]+1})\n\n'  # noqa: E501
                )
                f.write(text)
            print(f"Saved: {out_path} ({len(text.split())} words)")
    print(f"Done ingesting {PDF_PATH}\n")


# Main logic
if __name__ == "__main__":
    if "--all" in sys.argv:
        pdfs = glob.glob(os.path.join(BOOKS_DIR, "*.pdf"))
        print(f"Batch ingesting {len(pdfs)} PDFs in {BOOKS_DIR}")
        for pdf in pdfs:
            ingest_pdf(pdf, RAG_DATA_DIR)
        print("Batch ingestion complete.")
    else:
        if len(sys.argv) > 1:
            PDF_PATH = sys.argv[1]
        else:
            PDF_PATH = DEFAULT_PDF
        ingest_pdf(PDF_PATH, RAG_DATA_DIR)
    print("Review your rag-data/ directory. Do NOT commit these files to git.")
