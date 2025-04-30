const Parser = require("@pr4j3sh/codemap");
const { JSONLoader } = require("langchain/document_loaders/fs/json");
const { RecursiveCharacterTextSplitter } = require("@langchain/textsplitters");
const id = require("@pr4j3sh/id");

async function load(path) {
  const tree = new Parser(path).scan().getTree();
  const blob = new Blob([tree], { type: "application/json" });
  const loader = new JSONLoader(blob);
  const docs = await loader.load();
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const splittedDocs = await splitter.splitDocuments(docs);
  splittedDocs.forEach((doc) => {
    doc.id = id();
  });
  return splittedDocs;
}

module.exports = load;
