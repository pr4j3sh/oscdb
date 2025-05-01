const { embed } = require("./embedder");
const load = require("./loader");
const { storeData, createStore } = require("./store");

async function init(project, path) {
  const docs = await load(path);
  const embedDocs = await embed(docs);
  const store = createStore(project);
  await storeData(store, embedDocs, docs);
}

module.exports = init;
