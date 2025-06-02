// Mode and LLM/RAG form logic
const modeSelect = document.getElementById("mode");
const llmForm = document.getElementById("llm-form");
const llmPrompt = document.getElementById("llm-prompt");
const ragFileSection = document.getElementById("rag-file-section");
const ragFileInput = document.getElementById("rag-file");
const llmResponse = document.getElementById("llm-response");
const contextDiv = document.getElementById("context");
const personaSelect = document.getElementById("persona-select");
const customPersona = document.getElementById("custom-persona");

modeSelect.addEventListener("change", () => {
  if (modeSelect.value === "rag") {
    ragFileSection.style.display = "block";
  } else {
    ragFileSection.style.display = "none";
  }
});

personaSelect.addEventListener("change", () => {
  if (personaSelect.value === "custom") {
    customPersona.style.display = "block";
  } else {
    customPersona.style.display = "none";
  }
});

llmForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  llmResponse.textContent = "Loading...";
  contextDiv.style.display = "none";
  let persona =
    personaSelect.value === "custom"
      ? customPersona.value
      : personaSelect.value;
  let mode = modeSelect.value;
  let ragFile = ragFileInput.value;
  let payload = { prompt: llmPrompt.value, persona };
  if (mode === "rag" && ragFile) payload.rag_file = ragFile;
  logAll(
    `Submitting LLM form. Mode: ${mode}, Persona: ${persona}, RAG: ${ragFile}`,
  );
  try {
    const res = await fetch("/api/llm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    logAll(`LLM API response: ${JSON.stringify(data)}`);
    llmResponse.textContent =
      data.completion || data.response || JSON.stringify(data);
    if (data.context) {
      contextDiv.textContent = data.context;
      contextDiv.style.display = "block";
    }
    if (data.error) {
      logAll(`LLM API error: ${data.error}`, "error");
      llmResponse.textContent = `Error: ${data.error}`;
    }
  } catch (err) {
    logAll(`LLM API fetch error: ${err}`, "error");
    llmResponse.textContent = "Error: " + (err.message || err);
  }
});

// TTS section
const ttsForm = document.getElementById("tts-form");
const ttsPlatform = document.getElementById("tts-platform");
const voiceSelect = document.getElementById("voice-select");
const ttsAudio = document.getElementById("tts-audio");
const ttsStatus = document.getElementById("tts-status");
const voiceReset = document.getElementById("voice-reset");
const ttsText = document.getElementById("tts-text");

const staticVoices = [
  { id: "21m00Tcm4TlvDq8ikWAM", name: "Rachel" },
  { id: "8Z7Plc8b8G8Q9Q0Q9Q0Q", name: "Adam" },
  { id: "EXAVITQu4vr4xnSDxMaL", name: "Bella" },
  { id: "ErXwobaYiN019PkySvjV", name: "Antoni" },
  { id: "MF3mGyEYCl7XYWbV9V6O", name: "Elli" },
  { id: "TxGEqnHWrfWFTfGW9XjX", name: "Josh" },
  { id: "VR6AewLTigWG4xSOukaG", name: "Arnold" },
  { id: "yoZ06aMxZJJ28mfd3POQ", name: "Sam" },
];

function populateVoiceAssignments(voices) {
  ["voice-narrative", "voice-spoken", "voice-internal"].forEach((id) => {
    const sel = document.getElementById(id);
    if (!sel) return;
    sel.innerHTML = "";
    voices.forEach((v) => {
      const opt = document.createElement("option");
      opt.value = v.voice_id || v.id || v.name;
      opt.textContent = v.name || v.voice_id || v.id;
      sel.appendChild(opt);
    });
    // Set default to match main voice-select
    if (voiceSelect.value) sel.value = voiceSelect.value;
  });
}

async function fetchVoices() {
  ttsStatus.textContent = "Fetching voices...";
  let voices = [];
  if (ttsPlatform.value === "elevenlabs") {
    try {
      const res = await fetch("/api/voices");
      const data = await res.json();
      voices = data.voices;
      voiceSelect.innerHTML = "";
      voices.forEach((v) => {
        const opt = document.createElement("option");
        opt.value = v.voice_id || v.id || v.name;
        opt.textContent = v.name || v.voice_id || v.id;
        voiceSelect.appendChild(opt);
      });
      ttsStatus.textContent = "";
    } catch (err) {
      ttsStatus.textContent = "Failed to fetch voices.";
    }
  } else {
    // gTTS: use static voices (or just one default)
    voiceSelect.innerHTML = "";
    staticVoices.forEach((v) => {
      const opt = document.createElement("option");
      opt.value = v.id;
      opt.textContent = v.name;
      voiceSelect.appendChild(opt);
    });
    voices = staticVoices;
    ttsStatus.textContent = "";
  }
  populateVoiceAssignments(voices);
}

ttsPlatform.addEventListener("change", () => {
  saveSetting("tts-platform", ttsPlatform.value);
  logAll(`TTS platform changed: ${ttsPlatform.value}`);
  fetchVoices();
});
voiceSelect.addEventListener("change", () => {
  saveSetting("tts-main-voice", voiceSelect.value);
  logAll(`Main TTS voice changed: ${voiceSelect.value}`);
});
["voice-narrative", "voice-spoken", "voice-internal"].forEach((id) => {
  const sel = document.getElementById(id);
  if (sel)
    sel.addEventListener("change", () => {
      saveSetting(id, sel.value);
      logAll(`Voice assignment changed: ${id} = ${sel.value}`);
    });
});

ttsForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  ttsStatus.textContent = "Generating speech...";
  ttsAudio.style.display = "none";
  logAll(
    `Submitting TTS form. Platform: ${ttsPlatform.value}, Voice: ${voiceSelect.value}`,
  );
  try {
    const res = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: ttsText.value,
        voice: voiceSelect.value,
        platform: ttsPlatform.value,
      }),
    });
    if (!res.ok) throw new Error("TTS failed");
    const blob = await res.blob();
    ttsAudio.src = URL.createObjectURL(blob);
    ttsAudio.style.display = "block";
    ttsAudio.play();
    ttsStatus.textContent = "";
    logAll("TTS audio playback started.");
  } catch (err) {
    ttsStatus.textContent = "Error: " + (err.message || err);
    logAll(`TTS error: ${err}`, "error");
  }
});

// On load, fetch voices and set initial mode
fetchVoices();
modeSelect.dispatchEvent(new Event("change"));

// RAG Management Section
const ragBooksList = document.getElementById("rag-books-list");
const ragIngestedList = document.getElementById("rag-ingested-list");
const ragPreviewModal = document.getElementById("rag-preview-modal");

function closeRagPreview() {
  ragPreviewModal.style.display = "none";
  ragPreviewModal.innerHTML = "";
  document.body.focus();
}

async function fetchRagBooks() {
  ragBooksList.innerHTML = "<li>Loading...</li>";
  logAll("Fetching RAG books...");
  try {
    const res = await fetch("/api/rag/books");
    const data = await res.json();
    ragBooksList.innerHTML = "";
    data.books.forEach((book) => {
      const li = document.createElement("li");
      li.textContent = book + " ";
      // View PDF button
      const viewBtn = document.createElement("button");
      viewBtn.textContent = "View PDF";
      viewBtn.onclick = () => {
        logAll(`Viewing PDF: ${book}`);
        ragPreviewModal.innerHTML = `<div style='text-align:right'><button onclick='window.closeRagPreview()'>Close</button></div><embed src="/pdfs/${encodeURIComponent(
          book,
        )}" width="100%" height="600px" type="application/pdf">`;
        ragPreviewModal.style.display = "block";
      };
      li.appendChild(viewBtn);
      // Ingest button (with confirmation)
      const ingestBtn = document.createElement("button");
      ingestBtn.textContent = "Ingest (stub)";
      ingestBtn.title =
        "Ingest this PDF for RAG use. You will be asked to confirm.";
      ingestBtn.onclick = async () => {
        if (
          !confirm(
            `Are you sure you want to ingest '${book}' for RAG? This may take time and should only be done with your own content.`,
          )
        ) {
          logAll(`Ingest cancelled for book: ${book}`);
          return;
        }
        logAll(`Attempting to ingest book: ${book}`);
        try {
          const resp = await fetch("/api/rag/ingest", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ book }),
          });
          const msg = await resp.json();
          logAll(`RAG ingest response: ${JSON.stringify(msg)}`);
          alert(msg.status || JSON.stringify(msg));
        } catch (err) {
          logAll(`RAG ingest error: ${err}`, "error");
          alert("Error: " + (err.message || err));
        }
      };
      li.appendChild(ingestBtn);
      ragBooksList.appendChild(li);
    });
  } catch (err) {
    logAll(`Error fetching RAG books: ${err}`, "error");
    ragBooksList.innerHTML = `<li>Error loading books: ${
      err.message || err
    }</li>`;
  }
}

async function fetchRagIngested() {
  ragIngestedList.innerHTML = "<li>Loading...</li>";
  logAll("Fetching ingested RAG chapters...");
  try {
    const res = await fetch("/api/rag/ingested");
    const data = await res.json();
    ragIngestedList.innerHTML = "";
    data.chunks.forEach((chunk) => {
      const li = document.createElement("li");
      li.textContent = chunk + " ";
      // Preview button
      const previewBtn = document.createElement("button");
      previewBtn.textContent = "Preview";
      previewBtn.onclick = async () => {
        logAll(`Previewing RAG chunk: ${chunk}`);
        try {
          const resp = await fetch(
            `/api/rag/preview?file=${encodeURIComponent(chunk)}`,
          );
          const data = await resp.json();
          ragPreviewModal.innerHTML = `<div style='text-align:right'><button onclick='window.closeRagPreview()'>Close</button></div><pre style='white-space:pre-wrap;max-height:500px;overflow:auto;'>${
            data.content ? data.content : "[No content]"
          }</pre>`;
          ragPreviewModal.style.display = "block";
        } catch (err) {
          logAll(`Error previewing RAG chunk: ${err}`, "error");
          alert("Error: " + (err.message || err));
        }
      };
      li.appendChild(previewBtn);
      ragIngestedList.appendChild(li);
    });
  } catch (err) {
    logAll(`Error fetching ingested RAG chapters: ${err}`, "error");
    ragIngestedList.innerHTML = `<li>Error loading chapters: ${
      err.message || err
    }</li>`;
  }
}

// Expose close function for modal
window.closeRagPreview = closeRagPreview;

// Add refresh buttons
const ragBooksRefresh = document.createElement("button");
ragBooksRefresh.textContent = "Refresh";
ragBooksRefresh.onclick = fetchRagBooks;
document
  .getElementById("rag-books-list")
  .parentElement.appendChild(ragBooksRefresh);

const ragIngestedRefresh = document.createElement("button");
ragIngestedRefresh.textContent = "Refresh";
ragIngestedRefresh.onclick = fetchRagIngested;
document
  .getElementById("rag-ingested-list")
  .parentElement.appendChild(ragIngestedRefresh);

// Initial load
fetchRagBooks();
fetchRagIngested();

// Tagging toolbar logic
function wrapSelection(tag) {
  const textarea = llmPrompt;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  if (start === end) return; // No selection
  const before = textarea.value.substring(0, start);
  const selected = textarea.value.substring(start, end);
  const after = textarea.value.substring(end);
  textarea.value =
    before +
    `[${tag.toUpperCase()}]` +
    selected +
    `[/${tag.toUpperCase()}]` +
    after;
  // Restore selection
  textarea.focus();
  textarea.selectionStart = start;
  textarea.selectionEnd = end + tag.length * 2 + 5; // [TAG][/TAG]
}
document.getElementById("tag-narrative").onclick = () =>
  wrapSelection("NARRATIVE");
document.getElementById("tag-spoken").onclick = () => wrapSelection("SPOKEN");
document.getElementById("tag-internal").onclick = () =>
  wrapSelection("INTERNAL");

// Send to TTS button logic
const sendToTTSBtn = document.getElementById("send-to-tts");

// Add Auto-Tag for TTS button
const autoTagBtn = document.createElement("button");
autoTagBtn.type = "button";
autoTagBtn.id = "auto-tag-tts";
autoTagBtn.textContent = "Auto-Tag for TTS";
llmResponse.parentNode.insertBefore(autoTagBtn, sendToTTSBtn);

autoTagBtn.onclick = () => {
  const text = llmResponse.textContent;
  const lines = text.split(/\n|\r/);
  let tagged = "";
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    if (/".*"/.test(trimmed)) {
      tagged += `[SPOKEN]${trimmed}[/SPOKEN]\n`;
    } else {
      tagged += `[NARRATIVE]${trimmed}[/NARRATIVE]\n`;
    }
  });
  ttsText.value = tagged.trim();
  ttsText.focus();
};

// Helper: strip all tags and labels from a string
function stripTags(text) {
  // Remove [TAG], [/TAG], [TAG:], [ /TAG ], TAG:, and any case/whitespace
  return text
    .replace(/\[\s*\/?\s*[a-zA-Z0-9_\- ]+\s*:?\s*\]/g, "") // [TAG], [/TAG], [TAG:], [ /TAG ]
    .replace(/^\s*[a-zA-Z0-9_\- ]+\s*:\s*/gm, "") // TAG: at start of line
    .trim();
}

const debugLog = document.getElementById("debug-log");
function logAll(msg, level = "info") {
  logDebug(msg);
  if (level === "error") {
    console.error("[DNDAI]", msg);
  } else if (level === "warn") {
    console.warn("[DNDAI]", msg);
  } else {
    console.info("[DNDAI]", msg);
  }
}

sendToTTSBtn.onclick = async () => {
  clearDebugLog();
  let text = ttsText.value;
  logAll("Raw input:\n" + text + "\n");
  // Remove all tags before auto-tagging to prevent stacking
  text = stripTags(text);
  if (!/\[(narrative|spoken|internal)\]/i.test(text)) {
    // Auto-tag if no tags present
    const lines = text.split(/\n|\r/);
    let tagged = "";
    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) return;
      if (/".*"/.test(trimmed)) {
        tagged += `[SPOKEN]${trimmed}[/SPOKEN]\n`;
      } else {
        tagged += `[NARRATIVE]${trimmed}[/NARRATIVE]\n`;
      }
    });
    text = tagged.trim();
    ttsText.value = text;
    logAll("Auto-tagged input:\n" + text + "\n");
  }
  // Robust regex: match [TAG], [TAG:], [ /TAG ], TAG:, any case/whitespace
  const tagRegex =
    /(?:\[\s*([a-zA-Z0-9_\- ]+)\s*:?\s*\]([\s\S]*?)\[\s*\/\s*\1\s*\])|(?:^\s*([a-zA-Z0-9_\- ]+)\s*:\s*([\s\S]*?)(?=^\s*[a-zA-Z0-9_\- ]+\s*:|$))/gim;
  let segments = [];
  let match;
  while ((match = tagRegex.exec(text)) !== null) {
    let tag = (match[1] || match[3] || "").trim().toUpperCase();
    let segText = (match[2] || match[4] || "").trim();
    if (segText) segments.push({ tag, text: stripTags(segText) });
  }
  // If no segments matched, treat the whole text as one segment
  if (segments.length === 0 && text.trim()) {
    segments = [{ tag: "", text: stripTags(text) }];
  }
  // Remove empty segments
  segments = segments.filter((s) => s.text.length > 0);
  logAll("Segments detected:");
  // Get voice assignments
  const voiceMap = {
    NARRATIVE: document.getElementById("voice-narrative").value,
    SPOKEN: document.getElementById("voice-spoken").value,
    INTERNAL: document.getElementById("voice-internal").value,
  };
  segments.forEach((s, i) => {
    const voice =
      s.tag && voiceMap[s.tag] ? voiceMap[s.tag] : voiceSelect.value;
    logAll(
      `  [${i + 1}] tag: ${
        s.tag || "(none)"
      } | voice: ${voice} | text: ${JSON.stringify(s.text)}`,
    );
  });
  if (segments.length === 0) {
    ttsStatus.textContent = "No text to speak.";
    sendToTTSBtn.disabled = false;
    logAll("No segments to speak.");
    return;
  }
  ttsStatus.textContent = "Generating batch speech...";
  ttsAudio.style.display = "none";
  sendToTTSBtn.disabled = true;
  const platform = ttsPlatform.value;
  // Generate all audio blobs first
  let audios = [];
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    const voice =
      seg.tag && voiceMap[seg.tag] ? voiceMap[seg.tag] : voiceSelect.value;
    try {
      ttsStatus.textContent = `Generating speech (${i + 1}/${
        segments.length
      })...`;
      logAll(
        `Sending to TTS [${i + 1}]: voice=${voice}, text=${JSON.stringify(
          seg.text,
        )}`,
      );
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: seg.text,
          voice,
          platform,
        }),
      });
      if (!res.ok) throw new Error("TTS failed");
      const blob = await res.blob();
      audios.push(URL.createObjectURL(blob));
    } catch (err) {
      ttsStatus.textContent = "Error: " + err;
      sendToTTSBtn.disabled = false;
      logAll("TTS error: " + err, "error");
      return;
    }
  }
  // Play audios in sequence
  let idx = 0;
  function playNext() {
    if (idx >= audios.length) {
      ttsStatus.textContent = "";
      sendToTTSBtn.disabled = false;
      ttsAudio.onended = null;
      logAll("Playback finished.");
      return;
    }
    ttsAudio.src = audios[idx];
    ttsAudio.style.display = "block";
    ttsAudio.play();
    idx++;
    ttsAudio.onended = playNext;
  }
  playNext();
};

// Add Clear Debug Log button functionality
const clearDebugBtn = document.getElementById("clear-debug-log");
clearDebugBtn.onclick = () => {
  clearDebugLog();
  logAll("Debug log cleared.");
};

// --- Persistence helpers ---
function saveSetting(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}
function loadSetting(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

// Restore dropdowns on load
window.addEventListener("DOMContentLoaded", () => {
  // TTS Platform
  const savedPlatform = loadSetting("tts-platform");
  if (savedPlatform) {
    ttsPlatform.value = savedPlatform;
    logAll(`Loaded saved TTS platform: ${savedPlatform}`);
  }
  // Main voice
  const savedVoice = loadSetting("tts-main-voice");
  if (savedVoice) {
    voiceSelect.value = savedVoice;
    logAll(`Loaded saved main TTS voice: ${savedVoice}`);
  }
  // Voice assignments
  ["voice-narrative", "voice-spoken", "voice-internal"].forEach((id) => {
    const saved = loadSetting(id);
    if (saved) {
      const sel = document.getElementById(id);
      if (sel) {
        sel.value = saved;
        logAll(`Loaded saved voice assignment: ${id} = ${saved}`);
      }
    }
  });
});
