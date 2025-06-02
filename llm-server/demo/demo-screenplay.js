// DNDAI Screenplay Demo JS

// Elements
const screenplayInput = document.getElementById('screenplay-input');
const screenplayToTTSBtn = document.getElementById('screenplay-to-tts');
const ttsText = document.getElementById('tts-text');
const ttsForm = document.getElementById('tts-form');
const ttsPlatform = document.getElementById('tts-platform');
const voiceSelect = document.getElementById('voice-select');
const ttsAudio = document.getElementById('tts-audio');
const ttsStatus = document.getElementById('tts-status');
const voiceReset = document.getElementById('voice-reset');
const characterVoiceMappingDiv = document.getElementById('character-voice-mapping');

let availableVoices = [];
let characterVoiceMap = {};

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
      availableVoices = data.voices;
      voiceSelect.innerHTML = '';
      availableVoices.forEach(v => {
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
    // gTTS: use static voices
    voiceSelect.innerHTML = '';
    staticVoices.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v.id;
      opt.textContent = v.name;
      voiceSelect.appendChild(opt);
    });
    availableVoices = staticVoices;
    ttsStatus.textContent = '';
  }
}

function parseScreenplay(text) {
  // Returns array of {character, line}
  const lines = text.split(/\n|\r/);
  const parsed = [];
  for (let line of lines) {
    const m = line.match(/^\s*([A-Za-z0-9_\- ]+):\s*(.+)$/);
    if (m) {
      parsed.push({ character: m[1].trim(), line: m[2].trim() });
    }
  }
  return parsed;
}

function updateCharacterVoiceMapping(parsed) {
  // Find all unique characters
  const chars = [...new Set(parsed.map(p => p.character))];
  characterVoiceMappingDiv.innerHTML = '';
  chars.forEach(char => {
    const label = document.createElement('label');
    label.textContent = char + ': ';
    const sel = document.createElement('select');
    sel.id = 'voice-for-' + char;
    availableVoices.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v.voice_id || v.id || v.name;
      opt.textContent = v.name || v.voice_id || v.id;
      sel.appendChild(opt);
    });
    // Default: narrator/neutral = first voice, others = second
    sel.value = characterVoiceMap[char] || (char.toLowerCase().includes('narrator') ? voiceSelect.value : availableVoices[1]?.voice_id || availableVoices[1]?.id || availableVoices[1]?.name);
    sel.onchange = () => { characterVoiceMap[char] = sel.value; };
    characterVoiceMap[char] = sel.value;
    characterVoiceMappingDiv.appendChild(label);
    characterVoiceMappingDiv.appendChild(sel);
    characterVoiceMappingDiv.appendChild(document.createElement('br'));
  });
}

screenplayToTTSBtn.onclick = () => {
  const parsed = parseScreenplay(screenplayInput.value);
  updateCharacterVoiceMapping(parsed);
  // Show parsed lines in TTS textarea for review
  ttsText.value = parsed.map(p => `${p.character}: ${p.line}`).join('\n');
};

ttsForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const parsed = parseScreenplay(screenplayInput.value);
  if (!parsed.length) {
    ttsStatus.textContent = 'No screenplay lines found.';
    return;
  }
  ttsStatus.textContent = 'Generating batch speech...';
  ttsAudio.style.display = 'none';
  const platform = ttsPlatform.value;
  let audios = [];
  for (let i = 0; i < parsed.length; i++) {
    const { character, line } = parsed[i];
    const voice = characterVoiceMap[character] || voiceSelect.value;
    try {
      ttsStatus.textContent = `Generating speech (${i+1}/${parsed.length})...`;
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: line,
          voice,
          platform
        })
      });
      if (!res.ok) throw new Error('TTS failed');
      const blob = await res.blob();
      audios.push(URL.createObjectURL(blob));
    } catch (err) {
      ttsStatus.textContent = 'Error: ' + err;
      return;
    }
  }
  // Play audios in sequence
  let idx = 0;
  function playNext() {
    if (idx >= audios.length) {
      ttsStatus.textContent = '';
      return;
    }
    ttsAudio.src = audios[idx];
    ttsAudio.style.display = 'block';
    ttsAudio.play();
    idx++;
    ttsAudio.onended = playNext;
  }
  playNext();
});

// On load
fetchVoices();
ttsPlatform.addEventListener('change', fetchVoices);
voiceReset.addEventListener('click', fetchVoices); 