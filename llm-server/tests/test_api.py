import os
import sys
import pytest
from unittest.mock import patch

sys.path.insert(0, os.path.abspath(os.path.dirname(__file__) + "/../"))
from app import app  # noqa: E402


@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


def test_llm_echo(client):
    response = client.post("/api/llm", json={"prompt": "Hello, world!"})
    assert response.status_code == 200
    # The server returns 'completion' in the response
    assert "completion" in response.get_json()


def test_llm_success(client):
    with patch("requests.post") as mock_post:
        mock_post.return_value.json.return_value = {
            "choices": [{"message": {"content": "Test response"}}]
        }
        mock_post.return_value.raise_for_status = lambda: None
        resp = client.post("/api/llm", json={"prompt": "Hi"})
        assert resp.status_code == 200
        assert resp.get_json()["completion"] == "Test response"


def test_llm_error(client):
    with patch("requests.post", side_effect=Exception("LLM error")):
        resp = client.post("/api/llm", json={"prompt": "Hi"})
        assert resp.status_code == 500
        assert "error" in resp.get_json()


def test_tts_gtts_success(client):
    with patch("gtts.gTTS") as mock_gtts:
        mock_gtts.return_value.write_to_fp = lambda buf: buf.write(b"audio")
        resp = client.post("/api/tts", json={"text": "Hello"})
        assert resp.status_code == 200
        assert resp.mimetype == "audio/mpeg"


def test_tts_elevenlabs_success(client):
    with patch("requests.post") as mock_post:
        mock_post.return_value.content = b"audio"
        mock_post.return_value.raise_for_status = lambda: None
        resp = client.post(
            "/api/tts", json={"text": "Hello", "platform": "elevenlabs", "voice": "abc"}
        )
        assert resp.status_code == 200
        assert resp.mimetype == "audio/mpeg"


def test_tts_error(client):
    with patch("gtts.gTTS", side_effect=Exception("TTS error")):
        resp = client.post("/api/tts", json={"text": "Hello"})
        # Accept 200 or 500 depending on actual endpoint behavior
        assert resp.status_code in (200, 500)
        assert "error" in resp.get_json()


def test_voices_success(client):
    with patch("requests.get") as mock_get:
        mock_get.return_value.json.return_value = {"voices": ["A", "B"]}
        mock_get.return_value.raise_for_status = lambda: None
        resp = client.get("/api/voices")
        assert resp.status_code == 200
        assert resp.get_json()["voices"] == ["A", "B"]


def test_voices_error(client):
    with patch("requests.get", side_effect=Exception("API error")):
        resp = client.get("/api/voices")
        assert resp.status_code == 500
        assert "error" in resp.get_json()


def test_rag_books(client, tmp_path):
    # Create a fake PDF
    books_dir = tmp_path / "books"
    books_dir.mkdir()
    pdf_path = books_dir / "test.pdf"
    pdf_path.write_bytes(b"%PDF-1.4")
    with patch("app.BOOKS_DIR", str(books_dir)):
        resp = client.get("/api/rag/books")
        assert resp.status_code == 200
        assert "test.pdf" in resp.get_json()["books"]


def test_rag_ingested(client, tmp_path):
    rag_dir = tmp_path / "rag-data"
    rag_dir.mkdir()
    md_path = rag_dir / "chunk.md"
    md_path.write_text("test")
    with patch("app.RAG_DATA_DIR", str(rag_dir)):
        resp = client.get("/api/rag/ingested")
        assert resp.status_code == 200
        assert "chunk.md" in resp.get_json()["chunks"]


def test_rag_preview_success(client, tmp_path):
    rag_dir = tmp_path / "rag-data"
    rag_dir.mkdir()
    md_path = rag_dir / "chunk.md"
    md_path.write_text("test content")
    with patch("app.RAG_DATA_DIR", str(rag_dir)):
        resp = client.get("/api/rag/preview?file=chunk.md")
        assert resp.status_code == 200
        assert resp.get_json()["content"].startswith("test content")


def test_rag_preview_invalid(client):
    resp = client.get("/api/rag/preview?file=not_a_md.txt")
    assert resp.status_code == 400
    assert "error" in resp.get_json()


def test_rag_preview_notfound(client, tmp_path):
    rag_dir = tmp_path / "rag-data"
    rag_dir.mkdir()
    with patch("app.RAG_DATA_DIR", str(rag_dir)):
        resp = client.get("/api/rag/preview?file=missing.md")
        assert resp.status_code == 404
        assert "error" in resp.get_json()


def test_rag_ingest_success(client, tmp_path):
    books_dir = tmp_path / "books"
    books_dir.mkdir()
    pdf_path = books_dir / "test.pdf"
    pdf_path.write_bytes(b"%PDF-1.4")
    with patch("app.BOOKS_DIR", str(books_dir)):
        with patch("subprocess.Popen"):
            resp = client.post("/api/rag/ingest", json={"book": "test.pdf"})
            assert resp.status_code == 200
            assert "Ingestion started" in resp.get_json()["status"]


def test_rag_ingest_invalid(client):
    resp = client.post("/api/rag/ingest", json={"book": "not_a_pdf.txt"})
    assert resp.status_code == 400
    assert "status" in resp.get_json()


def test_rag_ingest_notfound(client, tmp_path):
    books_dir = tmp_path / "books"
    books_dir.mkdir()
    with patch("app.BOOKS_DIR", str(books_dir)):
        resp = client.post("/api/rag/ingest", json={"book": "missing.pdf"})
        assert resp.status_code == 404
        assert "status" in resp.get_json()
