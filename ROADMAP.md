# DNDAI Project Roadmap

This roadmap breaks down the AI-Assisted D&D "MCP" project into actionable phases and tasks. Check off items as you complete them!

---

## Phase 1: Core Integration (MVP)
- [ ] Set up project repository and CI/CD pipeline
- [ ] Create Docker baseline for development
- [ ] Develop a basic Foundry VTT module
- [ ] Integrate a single LLM (e.g., OpenAI GPT-4) with slash commands
- [ ] Implement DM approval UI for LLM outputs
- [ ] Document setup and usage instructions

## Phase 2: TTS & Voice Modulation
- [ ] Integrate ElevenLabs (or similar) TTS API
- [ ] Add voice profile selection for NPCs
- [ ] Enable TTS output in Foundry or via a companion app

## Phase 3: Retrieval-Augmented Generation (RAG)
- [ ] Set up vector database (Chroma/Weaviate)
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
- [ ] Gather user feedback and iterate on features
- [ ] Update documentation and onboarding guides
- [ ] Refactor and optimize codebase as needed

---

**Note:** This roadmap is a living document. Update as priorities shift or new features are proposed! 