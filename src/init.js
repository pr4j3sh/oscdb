const { embed } = require("./embedder");
const load = require("./loader");
const { storeData, createStore } = require("./store");

async function init(collection, path) {
  const docs = await load(collection, path);
  const embedding = await embed(collection, docs);
  const store = createStore(collection);
  await storeData(collection, store, embedding, docs);
}

module.exports = init;
