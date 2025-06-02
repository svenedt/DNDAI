# DNDAI Foundry VTT Module

This directory contains the DNDAI Master Control Program (MCP) module for Foundry Virtual Tabletop.

## Features

- Register LLM server URL in Foundry settings
- `/llmtest` chat command: send a prompt to your LLM server and display the response in chat
- Logging for all major actions and errors
- Standalone DM Approval UI test harness (`test-harness/`)

## Setup

1. Copy or symlink this folder into your Foundry VTT `modules/` directory.
2. In Foundry, enable the "DNDAI Master Control Program" module in your world.
3. Configure the LLM server URL in the module settings (default: `http://localhost:5050/api/llm`).
4. Use `/llmtest <prompt>` in chat to test LLM integration.

## Roadmap / Planned Features

- DM Approval workflow UI
- TTS and RAG integration
- In-game UI for persona/voice selection
- More robust error handling and user feedback
- Accessibility improvements (ARIA, keyboard navigation)

## Accessibility

- The test harness modal is being improved for ARIA roles and keyboard accessibility.
- Please report any accessibility issues or suggestions.

## Test Harness

- See `test-harness/README.md` for details on testing the DM Approval UI outside Foundry.

## License

MIT
