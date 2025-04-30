#!/usr/bin/env node

const { embed } = require("./src/embedder");
const load = require("./src/loader");
const { storeData } = require("./src/store");

async function init(path) {
  const docs = await load(path);
  const embedDocs = await embed(docs);
  await storeData(embedDocs, docs);
}

init(".");
