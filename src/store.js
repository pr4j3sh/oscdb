const { Chroma } = require("@langchain/community/vectorstores/chroma");
const { embeddings } = require("./embedder");

const store = new Chroma(embeddings, {
  collectionName: "codebase",
});

async function storeData(embedDocs, docs) {
  await store.addVectors(embedDocs, docs);
}

module.exports = { store, storeData };
