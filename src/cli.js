const { program } = require("commander");
const init = require("./init");
const query = require("./query");
const path = require("path");
const { listCollections, deleteCollection } = require("./utils");
const process = require("process");

program
  .name("oscar")
  .description("open source codebase augmented retrieval")
  .version("1.0.0");

program
  .command("init")
  .alias("i")
  .description("creates a collection for the codebase")
  .requiredOption(
    "-c, --collection <name>",
    "collection name(min. 3 characters, must be unique)",
  )
  .argument("<path>", "path to codebase")
  .action(async (codebasePath, opts) => {
    const p = path.resolve(codebasePath);
    if (opts.collection.length < 3) {
      console.error("collection name must be at least 3 characters long");
      process.exit(1);
    }
    await init(opts.collection, p);
  });

program
  .command("query")
  .alias("q")
  .description("query a specific project collection")
  .requiredOption("-p, --project <name>", "project name")
  .argument("<query>", "your search query")
  .action(async (q, opts) => {
    await query(opts.project, q);
  });

program
  .command("list")
  .description("list all available collections")
  .action(listCollections);

program
  .command("rm")
  .description("delete a collection")
  .argument("<collection>", "collection name")
  .action(async (collection) => {
    await deleteCollection(collection);
  });

module.exports = program;
