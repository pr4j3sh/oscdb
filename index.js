#!/usr/bin/env node

const getDocs = require("./src/loader");

async function init(path) {
  const docs = await getDocs(path);
  console.log(docs);
}

init(".");
