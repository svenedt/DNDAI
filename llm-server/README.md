# LLM Server (Skeleton)

This is a minimal Python Flask server for the DNDAI project. It currently provides a simple echo endpoint for development and testing.

## Setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Run the server:
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