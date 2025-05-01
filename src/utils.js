const { createSpinner } = require("nanospinner");
const process = require("process");
const client = require("./chroma");

const asString = (docs) => {
  return docs.map((d) => d.pageContent).join("\n\n");
};

async function listCollections() {
  const spinner = createSpinner("listing collections...").start();
  try {
    const collections = await client.listCollections();
    if (collections.length <= 0) {
      spinner.warn("no collections available");
      return;
    }
    spinner.success("available collections:");
    collections.forEach((col) => console.log(`  - ${col}`));
  } catch (error) {
    spinner.error(`${error.message}`);
    process.exit(1);
  }
}

async function deleteCollection(collection) {
  const spinner = createSpinner(`deleting ${collection}...`).start();
  try {
    const c = await client.getCollection({ name: collection });
    await client.deleteCollection(c);
    spinner.success(`${collection} deleted`);
  } catch (error) {
    spinner.error(`${error.message}`);
    process.exit(1);
  }
}

module.exports = { asString, listCollections, deleteCollection };
