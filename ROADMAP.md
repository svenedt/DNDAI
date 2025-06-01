# DNDAI Project Roadmap

This roadmap breaks down the AI-Assisted D&D "MCP" project into actionable phases and tasks, in a technically optimal order. Check off items as you complete them!

---

## Phase 1: Retrieval-Augmented Generation (RAG) Foundation
- [ ] Set up a vector database (Chroma, Weaviate, or FAISS) and basic ingestion/query pipeline
- [ ] Backend: Add endpoints for uploading/querying RAG data
- [ ] Frontend: UI for uploading/viewing RAG files, toggle RAG on/off
- [ ] Integrate RAG context into LLM completions

## Phase 2: Persona/NPC Management
- [ ] UI to create, edit, and save custom personas
- [ ] Backend: Store/retrieve persona definitions, assign default voices
- [ ] Assign personas to LLM and TTS interactions

## Phase 3: Advanced TTS Features
- [ ] Add controls for stability, style, accent, pitch, etc. (where supported)
- [ ] Save and reuse custom voice profiles
- [ ] Support for more TTS providers (Azure, Google Cloud, etc)

## Phase 4: Session/State Management
- [ ] Save/load session state (personas, context, chat history)
- [ ] Export/import campaign data

## Phase 5: Foundry VTT Integration
- [ ] Enable real-time LLM/TTS interaction from within Foundry
- [ ] Add chat panel/sidebar for AI/NPC dialogue
- [ ] Push TTS audio to players/DM in Foundry

## Phase 6: Speaker Tracking & Assignment
- [ ] Integrate Whisper or cloud STT for live speech-to-text
- [ ] UI for speaker assignment/correction
- [ ] Feed speaker-labeled text to LLM for context-aware responses

## Phase 7: Undo/Rewind/Timeline
- [ ] Event logging for all LLM/TTS actions
- [ ] UI: Timeline/history view, revert/undo actions
- [ ] Integrate with chat and VTT state

## Phase 8: Optional Enhancements
- [ ] Lighting integration (Hue, WLED) for scene-based effects
- [ ] AI art/image generation (Stable Diffusion, Midjourney)
- [ ] Soundboard integration (Syrinscape, Arkenforge)

---

## Ongoing Polish & DevOps
- [ ] Better error handling and user feedback in the UI
- [ ] API key management UI (show status, test keys)
- [ ] Mobile-friendly UI
- [ ] User authentication (for multi-user or cloud deployment)
- [ ] Deployment scripts (Docker Compose, systemd, etc)
- [ ] Expand automated tests (API, UI, integration)
- [ ] Add CI/CD for auto-deployments
- [ ] Usage analytics (opt-in)
- [x] Gather user feedback and iterate on features (ongoing)
- [x] Update documentation and onboarding guides (ongoing)
- [x] Refactor and optimize codebase as needed (ongoing)

---

**Note:** This roadmap is a living document. Update as priorities shift or new features are proposed! 