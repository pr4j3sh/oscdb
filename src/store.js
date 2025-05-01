const { Chroma } = require("@langchain/community/vectorstores/chroma");
const { embeddings } = require("./embedder");

function createStore(project) {
  const store = new Chroma(embeddings, {
    collectionName: project,
  });
  return store;
}

async function storeData(store, embedDocs, docs) {
  await store.addVectors(embedDocs, docs);
}

module.exports = { createStore, storeData };
