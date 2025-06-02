# DNDAI UI/UX Handoff for Designer (BOLT.DIY)

## Vision: Manual-First, Preview-Driven, Tabletop-Friendly

- All LLM/TTS output is previewed before being played or sent to chat.
- DM must explicitly approve, edit, reroll, or cancel every action.
- Debug log and error messages are always visible.
- Big buttons, dark mode, responsive, accessible.

---

## Key Screens & States

### Main Screen Layout

- **Prompt Input:** Textarea, persona selector, tagging toolbar, Generate/Send to TTS buttons, Settings button.
- **Preview Panel:** Shows output, allows Edit/Approve/Reroll/Cancel, "Now Narrating" indicator, error message.
- **Debug Log:** Collapsible, always accessible.
- **RAG Management:** List of books/chapters, ingest/upload button, preview modal.

### Key Interactions

- After "Generate" or "Send to TTS": Output appears in preview panel. DM can edit, approve/play, reroll, or cancel. Debug log updates.
- On Approve/Play: Output is spoken (TTS) or sent to chat. Visual feedback: "Now Narrating: [voice/persona]".
- On Error: Error message in preview and debug log.
- Settings Modal: Assign voices, choose TTS provider, test voices.
- Accessibility: Keyboard accessible, ARIA roles for modals, preview, debug log.

---

## Sample UI Code Snippets

### Main Layout (HTML Skeleton)

```html
<div class="dndai-app">
  <div class="main-panel">
    <form id="prompt-form">
      <div class="toolbar">
        <button type="button" id="tag-narrative">Narrative</button>
        <button type="button" id="tag-spoken">Spoken</button>
        <button type="button" id="tag-internal">Internal</button>
      </div>
      <textarea
        id="prompt-input"
        placeholder="Type your prompt or boxed text..."
      ></textarea>
      <select id="persona-select">
        <option>Gruff Dwarf Bartender</option>
        <option>Mysterious Elf Sage</option>
        <option>Custom...</option>
      </select>
      <input
        type="text"
        id="custom-persona"
        style="display:none;"
        placeholder="Custom persona..."
      />
      <button type="submit" id="generate-btn">Generate</button>
      <button type="button" id="tts-btn">Send to TTS</button>
      <button type="button" id="settings-btn">Settings</button>
    </form>
    <div id="rag-management">
      <h3>RAG Management</h3>
      <ul id="rag-books-list"></ul>
      <button id="ingest-btn">Ingest New Book</button>
    </div>
  </div>
  <div class="preview-panel" aria-live="polite">
    <h3>Preview</h3>
    <textarea id="preview-output"></textarea>
    <div class="preview-actions">
      <button id="approve-btn">Approve/Play</button>
      <button id="edit-btn">Edit</button>
      <button id="reroll-btn">Reroll</button>
      <button id="cancel-btn">Cancel</button>
    </div>
    <div id="now-narrating" style="display:none;">
      Now Narrating: <span id="narrator"></span>
    </div>
    <div id="error-message" role="alert"></div>
  </div>
  <div class="debug-log-panel">
    <button id="toggle-debug-log">Debug Log</button>
    <pre id="debug-log"></pre>
  </div>
</div>
```

### Settings Modal (HTML Skeleton)

```html
<div id="settings-modal" role="dialog" aria-modal="true" style="display:none;">
  <h2>Settings</h2>
  <label for="tts-provider">TTS Provider:</label>
  <select id="tts-provider">
    <option value="gtts">gTTS</option>
    <option value="elevenlabs">ElevenLabs</option>
  </select>
  <h3>Voice Assignment</h3>
  <label for="voice-narrative">Narrative:</label>
  <select id="voice-narrative"></select>
  <button id="test-voice-narrative">Test</button>
  <label for="voice-spoken">Spoken:</label>
  <select id="voice-spoken"></select>
  <button id="test-voice-spoken">Test</button>
  <label for="voice-internal">Internal:</label>
  <select id="voice-internal"></select>
  <button id="test-voice-internal">Test</button>
  <button id="close-settings">Close</button>
</div>
```

---

## Handoff Instructions for Designer

- **Goal:** Create a clean, dark-mode, tabletop-friendly UI for the above flows.
- **Prioritize:** Preview/approval flow, big buttons, clear feedback, and accessibility.
- **Deliver:** Figma, HTML/CSS mockup, or similar—ready for implementation.
