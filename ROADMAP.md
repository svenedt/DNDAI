# DNDAI Project Roadmap

This roadmap breaks down the AI-Assisted D&D "MCP" project into actionable phases and tasks. Check off items as you complete them!

---

## Phase 1: Core Integration (MVP)
- [x] Set up project repository and CI/CD pipeline
- [x] Create Docker baseline for development
- [x] Develop a basic Foundry VTT module
- [x] Integrate a single LLM (OpenRouter API, echo endpoint)
- [x] Implement DM approval UI for LLM outputs (Foundry + standalone test harness)
- [x] Document setup and usage instructions
- [x] Add backend demo UI for LLM server
- [x] Add logging and error handling to backend
- [x] Make LLM server URL configurable in Foundry module
- [x] Add basic API test for backend
- [x] Fix import/test issues for backend
- [x] Unify backend and frontend under Flask (serve static frontend from Flask)
- [x] Modern web demo UI (dark theme, persona, RAG, TTS, voice list)
- [x] .env-based API key management

## Phase 2: TTS & Voice Modulation
- [x] Add TTS endpoint to backend (gTTS, basic)
- [x] Integrate ElevenLabs TTS API
- [x] Add voice profile selection for NPCs (dynamic voice list)
- [ ] Enable TTS output in Foundry or via a companion app

## Phase 3: Retrieval-Augmented Generation (RAG)
- [ ] Set up vector database (Chroma/Weaviate)
- [x] Add sample RAG data file
- [ ] Index SRD and homebrew content
- [ ] Implement /rules or Q&A command with RAG

## Phase 4: Speaker Tracking
- [ ] Integrate Whisper + Pyannote (or cloud STT)
- [ ] Build UI for speaker assignment/correction
- [ ] Feed speaker-labeled text to LLM

## Phase 5: Undo/Rewind System
- [ ] Implement event logging and state snapshots
- [ ] Build timeline UI for DM to revert actions
- [ ] Integrate with chat and VTT state

## Phase 6: Optional Enhancements
- [ ] Integrate Hue/WLED lighting for scene-based effects
- [ ] Add Stable Diffusion/Midjourney image generation
- [ ] Integrate soundboard API (Syrinscape, Arkenforge, etc.)

---

## Ongoing
- [x] Gather user feedback and iterate on features (ongoing)
- [x] Update documentation and onboarding guides (ongoing)
- [x] Refactor and optimize codebase as needed (ongoing)

---

**Note:** This roadmap is a living document. Update as priorities shift or new features are proposed! 