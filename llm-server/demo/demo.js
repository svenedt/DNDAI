// Mode and LLM/RAG form logic
const modeSelect = document.getElementById('mode');
const llmForm = document.getElementById('llm-form');
const llmPrompt = document.getElementById('llm-prompt');
const ragFileSection = document.getElementById('rag-file-section');
const ragFileInput = document.getElementById('rag-file');
const llmResponse = document.getElementById('llm-response');
const contextDiv = document.getElementById('context');
const personaSelect = document.getElementById('persona-select');
const customPersona = document.getElementById('custom-persona');

modeSelect.addEventListener('change', () => {
  if (modeSelect.value === 'rag') {
    ragFileSection.style.display = 'block';
  } else {
    ragFileSection.style.display = 'none';
  }
});

personaSelect.addEventListener('change', () => {
  if (personaSelect.value === 'custom') {
    customPersona.style.display = 'block';
  } else {
    customPersona.style.display = 'none';
  }
});

llmForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  llmResponse.textContent = 'Loading...';
  contextDiv.style.display = 'none';
  let persona = personaSelect.value === 'custom' ? customPersona.value : personaSelect.value;
  let mode = modeSelect.value;
  let ragFile = ragFileInput.value;
  let payload = { prompt: llmPrompt.value, persona };
  if (mode === 'rag' && ragFile) payload.rag_file = ragFile;
  try {
    const res = await fetch('/api/llm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    llmResponse.textContent = data.completion || data.response || JSON.stringify(data);
    if (data.context) {
      contextDiv.textContent = data.context;
      contextDiv.style.display = 'block';
    }
  } catch (err) {
    llmResponse.textContent = 'Error: ' + err;
  }
});

// TTS section
const ttsForm = document.getElementById('tts-form');
const ttsPlatform = document.getElementById('tts-platform');
const voiceSelect = document.getElementById('voice-select');
const ttsAudio = document.getElementById('tts-audio');
const ttsStatus = document.getElementById('tts-status');
const voiceReset = document.getElementById('voice-reset');
const ttsText = document.getElementById('tts-text');

const staticVoices = [
  { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel' },
  { id: '8Z7Plc8b8G8Q9Q0Q9Q0Q', name: 'Adam' },
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Bella' },
  { id: 'ErXwobaYiN019PkySvjV', name: 'Antoni' },
  { id: 'MF3mGyEYCl7XYWbV9V6O', name: 'Elli' },
  { id: 'TxGEqnHWrfWFTfGW9XjX', name: 'Josh' },
  { id: 'VR6AewLTigWG4xSOukaG', name: 'Arnold' },
  { id: 'yoZ06aMxZJJ28mfd3POQ', name: 'Sam' }
];

async function fetchVoices() {
  ttsStatus.textContent = 'Fetching voices...';
  if (ttsPlatform.value === 'elevenlabs') {
    try {
      const res = await fetch('/api/voices');
      const data = await res.json();
      voiceSelect.innerHTML = '';
      data.voices.forEach(v => {
        const opt = document.createElement('option');
        opt.value = v.voice_id || v.id || v.name;
        opt.textContent = v.name || v.voice_id || v.id;
        voiceSelect.appendChild(opt);
      });
      ttsStatus.textContent = '';
    } catch (err) {
      ttsStatus.textContent = 'Failed to fetch voices.';
    }
  } else {
    // gTTS: use static voices (or just one default)
    voiceSelect.innerHTML = '';
    staticVoices.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v.id;
      opt.textContent = v.name;
      voiceSelect.appendChild(opt);
    });
    ttsStatus.textContent = '';
  }
}

ttsPlatform.addEventListener('change', fetchVoices);
voiceReset.addEventListener('click', fetchVoices);

ttsForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  ttsStatus.textContent = 'Generating speech...';
  ttsAudio.style.display = 'none';
  try {
    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: ttsText.value,
        voice: voiceSelect.value,
        platform: ttsPlatform.value
      })
    });
    if (!res.ok) throw new Error('TTS failed');
    const blob = await res.blob();
    ttsAudio.src = URL.createObjectURL(blob);
    ttsAudio.style.display = 'block';
    ttsAudio.play();
    ttsStatus.textContent = '';
  } catch (err) {
    ttsStatus.textContent = 'Error: ' + err;
  }
});

// On load, fetch voices and set initial mode
fetchVoices();
modeSelect.dispatchEvent(new Event('change'));

// RAG Management Section
const ragBooksList = document.getElementById('rag-books-list');
const ragIngestedList = document.getElementById('rag-ingested-list');
const ragPreviewModal = document.getElementById('rag-preview-modal');

function closeRagPreview() {
  ragPreviewModal.style.display = 'none';
  ragPreviewModal.innerHTML = '';
}

async function fetchRagBooks() {
  ragBooksList.innerHTML = '<li>Loading...</li>';
  const res = await fetch('/api/rag/books');
  const data = await res.json();
  ragBooksList.innerHTML = '';
  data.books.forEach(book => {
    const li = document.createElement('li');
    li.textContent = book + ' ';
    // View PDF button
    const viewBtn = document.createElement('button');
    viewBtn.textContent = 'View PDF';
    viewBtn.onclick = () => {
      ragPreviewModal.innerHTML = `<div style='text-align:right'><button onclick='window.closeRagPreview()'>Close</button></div><embed src="/pdfs/${encodeURIComponent(book)}" width="100%" height="600px" type="application/pdf">`;
      ragPreviewModal.style.display = 'block';
    };
    li.appendChild(viewBtn);
    // Ingest button (stub)
    const ingestBtn = document.createElement('button');
    ingestBtn.textContent = 'Ingest (stub)';
    ingestBtn.onclick = async () => {
      const resp = await fetch('/api/rag/ingest', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({book})});
      const msg = await resp.json();
      alert(msg.status || JSON.stringify(msg));
    };
    li.appendChild(ingestBtn);
    ragBooksList.appendChild(li);
  });
}

async function fetchRagIngested() {
  ragIngestedList.innerHTML = '<li>Loading...</li>';
  const res = await fetch('/api/rag/ingested');
  const data = await res.json();
  ragIngestedList.innerHTML = '';
  data.chunks.forEach(chunk => {
    const li = document.createElement('li');
    li.textContent = chunk + ' ';
    // Preview button
    const previewBtn = document.createElement('button');
    previewBtn.textContent = 'Preview';
    previewBtn.onclick = async () => {
      const resp = await fetch(`/api/rag/preview?file=${encodeURIComponent(chunk)}`);
      const data = await resp.json();
      ragPreviewModal.innerHTML = `<div style='text-align:right'><button onclick='window.closeRagPreview()'>Close</button></div><pre style='white-space:pre-wrap;max-height:500px;overflow:auto;'>${data.content ? data.content : '[No content]'}</pre>`;
      ragPreviewModal.style.display = 'block';
    };
    li.appendChild(previewBtn);
    ragIngestedList.appendChild(li);
  });
}

// Expose close function for modal
window.closeRagPreview = closeRagPreview;

// Add refresh buttons
const ragBooksRefresh = document.createElement('button');
ragBooksRefresh.textContent = 'Refresh';
ragBooksRefresh.onclick = fetchRagBooks;
document.getElementById('rag-books-list').parentElement.appendChild(ragBooksRefresh);

const ragIngestedRefresh = document.createElement('button');
ragIngestedRefresh.textContent = 'Refresh';
ragIngestedRefresh.onclick = fetchRagIngested;
document.getElementById('rag-ingested-list').parentElement.appendChild(ragIngestedRefresh);

// Initial load
fetchRagBooks();
fetchRagIngested(); 