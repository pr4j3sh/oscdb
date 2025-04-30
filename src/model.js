const { ChatOllama } = require("@langchain/ollama");

const model = new ChatOllama({
  model: "llama3.2",
});

module.exports = model;
