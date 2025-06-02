# DNDAI User Experience: Manual-First, Preview-Driven Flow

## 1. Start of Session

- The DM opens the DNDAI UI (on a laptop, tablet, or second screen).
- The interface is clean, dark-mode, and "tabletop friendly" (big buttons, clear sections).

---

## 2. Main User Flows

### A. Narration or NPC Dialogue (LLM/TTS)

1. **Input**
   - DM types or pastes a prompt (e.g., boxed text, NPC question, or scene description).
   - Optionally selects a persona or tags (e.g., [NARRATIVE], [SPOKEN]).
2. **Submit**
   - DM clicks "Generate" (for LLM) or "Send to TTS" (for narration).
3. **Preview Panel**
   - The generated output appears in a preview area.
   - DM can:
     - **Edit** the text (fix typos, tweak tone, etc.)
     - **Approve/Play** (send to TTS or chat)
     - **Reroll** (regenerate with the same prompt)
     - **Cancel** (discard and return to input)
   - The debug log and any error messages are visible below the preview.
4. **Output**
   - On approval, the output is spoken (TTS) or sent to chat.
   - Visual feedback shows which voice/persona is speaking.

---

### B. Rules Lookup (RAG)

1. **Input**
   - DM or player types a rules question (e.g., "What's the rule for grappling?").
2. **Submit**
   - Click "Ask" or similar.
3. **Preview Panel**
   - The answer appears, with source (book/page) and a preview of the relevant text.
   - DM can:
     - **Approve** (read aloud, send to chat, or just use for reference)
     - **Reroll** (try again)
     - **Cancel**

---

### C. RAG Management

1. **Ingest**
   - DM uploads or selects a PDF/book to ingest.
   - Progress and errors are shown clearly.
   - Ingested chapters/files are listed and can be previewed.

---

### D. Settings & Customization

- DM can assign voices to tags/personas, choose TTS provider, and save preferences.
- All changes are logged and can be tested immediately.

---

### E. Troubleshooting

- If anything fails, a clear error message appears in the preview/debug area.
- The debug log shows all actions, API calls, and errors for easy troubleshooting.

---

## 3. Manual-First, Automation-Ready

- **All actions require explicit DM approval in this mode.**
- In the future, a "Settings" toggle will allow DMs to enable auto-approve/auto-play for a faster workflow.

---

## 4. Accessibility & Responsiveness

- All controls are keyboard accessible.
- ARIA roles and focus management for modals and preview panels.
- Works on desktop, tablet, or phone.

---

## 5. Delightful Touches

- "Undo"/"Rewind" last spoken line.
- "Session history" for reviewing past prompts/responses.
- Visual "Now Narrating" indicator.

---

**This experience ensures:**

- DMs are always in control.
- No surprises at the table.
- Easy troubleshooting and iteration.
- Ready for future automation as the system matures.
