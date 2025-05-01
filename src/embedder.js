const { OllamaEmbeddings } = require("@langchain/ollama");
const { createSpinner } = require("nanospinner");
const process = require("process");

const embeddings = new OllamaEmbeddings({
  model: "llama3.2",
});

async function embed(collection, docs) {
  const spinner = createSpinner(
    `embedding ${collection} codebase(this might take some time, go grab a cup of coffee)...`,
  ).start();
  try {
    const embeddedDocs = await embeddings.embedDocuments(
      docs.map((d) => d.pageContent),
    );

    spinner.success(`${collection} embedded`);
    return embeddedDocs;
  } catch (error) {
    spinner.error(`${error.message}`);
    process.exit(1);
  }
}

module.exports = { embeddings, embed };
