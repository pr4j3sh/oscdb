const { OllamaEmbeddings } = require("@langchain/ollama");
const { createSpinner } = require("nanospinner");
const process = require("process");
const { BATCH_SIZE } = require("./consts");

const embeddings = new OllamaEmbeddings({
  model: "llama3.2",
});

async function embed(collection, docs) {
  const spinner = createSpinner(
    `embedding ${collection} codebase(this might take some time, go grab a cup of coffee)...`,
  ).start();
  try {
    let embeddedDocs = [];
    for (let i = 0; i < docs.length; i += BATCH_SIZE) {
      const chunk = docs.slice(i, i + BATCH_SIZE);
      const batch = await embeddings.embedDocuments(
        chunk.map((d) => d.pageContent),
      );
      embeddedDocs.push(...batch);
    }

    spinner.success(`${collection} embedded`);
    return embeddedDocs;
  } catch (error) {
    spinner.error(`${error.message}`);
    process.exit(1);
  }
}

module.exports = { embeddings, embed };
