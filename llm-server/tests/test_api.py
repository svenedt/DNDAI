import os
import sys
import pytest

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
    # The server currently echoes the input JSON under the 'echo' key
    assert response.get_json().get("echo", {}).get("prompt") == (
        "Hello, world!"  # noqa: E501
    )
