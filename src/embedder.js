const { OllamaEmbeddings } = require("@langchain/ollama");

const embeddings = new OllamaEmbeddings({
  model: "llama3.2",
});

async function embed(docs) {
  const embedDocs = await embeddings.embedDocuments(
    docs.map((d) => d.pageContent),
  );
  return embedDocs;
}

module.exports = { embeddings, embed };
