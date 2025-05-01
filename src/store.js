const { Chroma } = require("@langchain/community/vectorstores/chroma");
const { embeddings } = require("./embedder");
const { createSpinner } = require("nanospinner");
const process = require("process");
const { CHROMA_PATH } = require("./consts");

function createStore(collection) {
  try {
    const store = new Chroma(embeddings, {
      collectionName: collection,
    });
    return store;
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

async function storeData(collection, store, embedDocs, docs) {
  const spinner = createSpinner(`storing ${collection} codebase...`).start();
  try {
    await store.addVectors(embedDocs, docs);
    spinner.success(`${collection} codebase stored`);
  } catch (error) {
    spinner.error(`${error.message}`);
    process.exit(1);
  }
}

module.exports = { createStore, storeData };
