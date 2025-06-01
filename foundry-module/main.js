// Placeholder for Foundry VTT module main script
// Update this to your server's LAN IP address if running Foundry on another machine
const LLM_SERVER_URL = 'http://192.168.1.100:5050/api/llm'; // <-- CHANGE THIS TO YOUR SERVER'S IP

Hooks.once('init', () => {
  console.log('Foundry module loaded.');

  // Register a chat command
  Hooks.on('chatMessage', async (chatLog, message, chatData) => {
    if (message.startsWith('/llmtest')) {
      const input = message.replace('/llmtest', '').trim() || 'Hello from Foundry!';
      try {
        const response = await fetch(LLM_SERVER_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ test: input })
        });
        const data = await response.json();
        ChatMessage.create({ content: `LLM Server says: ${JSON.stringify(data)}` });
      } catch (err) {
        ChatMessage.create({ content: `Error contacting LLM server: ${err}` });
      }
      return false; // Prevents the default chat message
    }
    return true;
  });
}); 