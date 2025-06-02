// Register a Foundry module setting for the LLM server URL
Hooks.once("init", () => {
  game.settings.register("dndai-mcp", "llmServerUrl", {
    name: "LLM Server URL",
    hint: "The URL of your LLM server (e.g., http://192.168.1.115:5050/api/llm)",
    scope: "world",
    config: true,
    type: String,
    default: "http://localhost:5050/api/llm",
  });

  console.log("Foundry module loaded.");

  // Register a chat command
  Hooks.on("chatMessage", async (chatLog, message, chatData) => {
    if (message.startsWith("/llmtest")) {
      const input =
        message.replace("/llmtest", "").trim() || "Hello from Foundry!";
      const LLM_SERVER_URL = game.settings.get("dndai-mcp", "llmServerUrl");
      try {
        const response = await fetch(LLM_SERVER_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ test: input }),
        });
        const data = await response.json();
        ChatMessage.create({
          content: `LLM Server says: ${JSON.stringify(data)}`,
        });
      } catch (err) {
        ChatMessage.create({ content: `Error contacting LLM server: ${err}` });
      }
      return false; // Prevents the default chat message
    }
    return true;
  });
});
