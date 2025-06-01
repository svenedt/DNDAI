# LLM Server (Skeleton)

This is a minimal Python Flask server for the DNDAI project. It currently provides a simple echo endpoint for development and testing.

## Setup

1. Install dependencies:
   ```bash
   pip install flask
   ```
   Or use the provided requirements.txt:
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
  - Response: Echoes the input JSON

This server will be expanded to support LLM calls and advanced features as development progresses. 