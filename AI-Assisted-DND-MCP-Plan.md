# AI-Assisted D&D "MCP"
Master Control Program for Immersive Tabletop Role-Playing

## Table of Contents
1. Introduction & Goals
2. Core Components
   - 2.1 Foundry VTT (or Similar)
   - 2.2 Multi-LLM Integration
   - 2.3 TTS & Voice Modulation
   - 2.4 Retrieval-Augmented Generation (RAG)
   - 2.5 D&D Beyond Interaction (Optional)
3. Advanced Features
   - 3.1 DM Approval Screen & Co-DM Workflow
   - 3.2 Speaker Tracking & Voice Differentiation
   - 3.3 Undo/Rewind System
4. Docker/Deployment Considerations
   - 4.1 Container Architecture
   - 4.2 Audio / Hardware Setup
   - 4.3 Network & Security
5. Optional Enhancements
   - 5.1 Lights & Atmosphere (Hue / WLED)
   - 5.2 Image Generation / AI Art
   - 5.3 Soundboard Integration
6. Roadmap / Milestones
7. Conclusion

---

## 1. Introduction & Goals
This project aims to build a Master Control Program (MCP) for running D&D (or similar TTRPG) sessions in a highly immersive, AI-assisted manner. Key goals:
- Seamless integration of LLMs (like GPT, Claude, PaLM) to provide on-the-fly NPC dialogue, rules lookups, and encounter ideas.
- DM Approval workflow so the AI remains a co-DM with the human DM holding final authority.
- Speech Recognition & Speaker Tracking to identify who's talking at the table and feed accurate context to the AI.
- Undo/Rewind to correct mistakes or retcon undesired story twists.
- TTS for spoken NPC lines, dynamic environment narration, or other roleplay flourishes.
- Optional lighting integration (Hue/WLED) and image generation for added ambiance.

---

## 2. Core Components
### 2.1 Foundry VTT (or Similar)
- Primary VTT for maps, combat, tokens, character sheets, etc.
- Module-Friendly: Foundry supports custom modules (in JavaScript/TypeScript) to integrate AI logic, TTS calls, and advanced features (like hooking into scene changes or chat).

### 2.2 Multi-LLM Integration
- LLM Manager: A unified interface that can call GPT-3.5/4, Claude, Google PaLM, or other endpoints based on user preference, cost, or context size.
- Use Cases:
  - NPC/Story Generation.
  - Quick item/monster generation.
  - Rules clarifications.
- API Keys & Settings: Stored in a secure manner (module settings, environment variables).

### 2.3 TTS & Voice Modulation
- ElevenLabs (or other service) for high-quality text-to-speech.
- Voice Profiles:
  - Assign different voices to recurring NPCs or moods (angry/calm version).
  - Control parameters (stability, similarity) for emotional inflection.
- On-the-Fly Variation:
  - Add punctuation or stage directions to produce more expressive lines.
  - Option to store & reuse commonly used lines.

### 2.4 Retrieval-Augmented Generation (RAG)
- Data Indexing:
  - SRD + custom/homebrew content (PDF → text → embeddings in a vector DB).
- Query Flow:
  - On a /rules or scenario prompt, retrieve relevant text chunks, feed them to the LLM for context-aware answers.
- Privacy:
  - Keep copyrighted text behind a private index.
- Vector Database:
  - Self-hosted (Chroma, Weaviate) or cloud-based (Pinecone).

### 2.5 D&D Beyond Interaction (Optional)
- Beyond20: For dice rolls, partial integration with D&D Beyond character sheets.
- Unofficial Importers: If you own official content and want it in Foundry or your RAG pipeline, parse it privately.
- Auto-Approval: Minor rules clarifications from the SRD or repeated content can skip DM approval.

---

## 3. Advanced Features
### 3.1 DM Approval Screen & Co-DM Workflow
- Approval Panel:
  - Displays any LLM-suggested output (NPC lines, story events) as a draft.
  - DM can "Accept," "Edit," "Reject/Re-roll."
- Chain-of-Thought / Meta Chat:
  - Private channel where the DM and LLM discuss or refine ideas.
  - Not visible to players.
- Auto-Approve:
  - Minor or trivial responses can pass automatically (e.g., "The door is locked").

### 3.2 Speaker Tracking & Voice Differentiation
- Real-Time Speech Recognition:
  - Tools: Google Speech-to-Text, AWS Transcribe, or local Whisper + Pyannote.
- Diarization:
  - System identifies "Speaker_1," "Speaker_2," etc., then DM names them "Alice," "Bob," etc.
- Feeding to LLM:
  - LLM sees who asked each question or made each statement, enabling more personalized and accurate responses.
- UI:
  - DM can correct misassigned speaker tags on the fly.

### 3.3 Undo/Rewind System
- Snapshot or Event Log:
  - Each major action (rules calls, HP changes, AI narrative) is stored either as a diff or full snapshot.
- Simple UI:
  - A timeline of past events. DM can revert to a previous state if players or the AI made a mistake.
- Chat Annotation:
  - Mark undone statements as "stricken" or remove them to reflect the retcon.

---

## 4. Docker/Deployment Considerations
### 4.1 Container Architecture
- Foundry Container:
  - Possibly using community images (e.g., felddy/foundryvtt).
- RAG/AI Container:
  - Python or Node server that handles embeddings, LLM calls, TTS logic.
- Vector DB Container:
  - Chroma, Weaviate, or Milvus for storing chunk embeddings.
- Proxy/SSL:
  - Nginx/Caddy for routing and HTTPS.
- Optional:
  - Node-RED / Home Assistant if doing Hue/WLED automation.

### 4.2 Audio / Hardware Setup
- Mics:
  - Single omnidirectional or multiple boundary mics.
- Speakers:
  - For TTS output or additional ambient sound.
- GPU:
  - If running local Whisper/LLMs for real-time speeds, ensure enough GPU/CPU resources.

### 4.3 Network & Security
- Local LAN:
  - Keep devices on the same local network for minimal latency.
- Cloud Access:
  - If hosting for remote players, ensure secure login and SSL.
- API Keys:
  - Store them privately (module settings or .env files).

---

## 5. Optional Enhancements
### 5.1 Lights & Atmosphere (Hue / WLED)
- Scene-Based Lighting:
  - When the scene changes to a spooky crypt, automatically dim lights to purple/blue.
- Sound-Reactive:
  - If using a soundboard, the lights can pulse with certain SFX or music tracks.

### 5.2 Image Generation / AI Art
- Stable Diffusion or Midjourney
  - Generate NPC portraits or location art on the fly.
- Integration:
  - Foundry can import these as handouts or token art.

### 5.3 Soundboard Integration
- Syrinscape, Arkenforge, or custom modules
  - Trigger SFX or ambiance in sync with TTS or LLM events.

---

## 6. Roadmap / Milestones
1. Phase 1:
   - Basic Foundry + LLM slash commands. Return text to DM for approval.
2. Phase 2:
   - TTS integration (ElevenLabs), voice selection & parameter control.
3. Phase 3:
   - RAG with SRD, implement a /rules or Q&A command.
4. Phase 4:
   - Speaker diarization, real-time speech → text. LLM sees labeled player lines.
5. Phase 5:
   - Undo/Rewind system for major actions.
6. Phase 6:
   - Optional expansions: Hue/WLED lighting, image generation, advanced AI-based monster creation, etc.

---

## 7. Conclusion
With this plan, you're creating a comprehensive AI-driven TTRPG experience where:
- Players talk freely, get recognized by name, and see curated, high-quality responses from an AI "co-DM."
- DM retains creative control via an approval interface, chain-of-thought meta chat, and a robust undo feature.
- Immersion is heightened with TTS for NPC dialogue, dynamic lighting, and auto-generated images or maps.
- Flexibility is ensured with Docker-based microservices and a modular approach to each feature. 