document.getElementById('llm-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const prompt = document.getElementById('prompt').value;
  const responseDiv = document.getElementById('response');
  responseDiv.textContent = 'Loading...';
  const res = await fetch('/api/llm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });
  const data = await res.json();
  responseDiv.textContent = data.completion || 'No response.';
}); 