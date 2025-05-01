const Parser = require("@pr4j3sh/codemap");
const { JSONLoader } = require("langchain/document_loaders/fs/json");
const { RecursiveCharacterTextSplitter } = require("@langchain/textsplitters");
const id = require("@pr4j3sh/id");
const { createSpinner } = require("nanospinner");
const process = require("process");
const { CHUNK_SIZE, CHUNK_OVERLAP, BLOB_TYPE } = require("./consts");

async function load(collection, path) {
  const spinner = createSpinner(`loading ${collection} codebase...`).start();
  try {
    const tree = new Parser(path).scan().getTree();
    const blob = new Blob([tree], { type: BLOB_TYPE });
    const loader = new JSONLoader(blob);
    const docs = await loader.load();
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: CHUNK_SIZE,
      chunkOverlap: CHUNK_OVERLAP,
    });
    const splittedDocs = await splitter.splitDocuments(docs);
    splittedDocs.forEach((doc) => {
      doc.id = id();
    });
    spinner.success(`${collection} loaded`);
    return splittedDocs;
  } catch (error) {
    spinner.error(`${error.message}`);
    process.exit(1);
  }
}

module.exports = load;
