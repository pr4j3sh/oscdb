const { program } = require("commander");
const init = require("./init");
const query = require("./query");
const path = require("path");
const { listProjects, deleteProject } = require("./utils");

program
  .name("oscar")
  .description("open source codebase augmented retrieval")
  .version("1.0.0");

program
  .command("init")
  .alias("i")
  .description("creates a collection for the codebase")
  .requiredOption("-c, --collection <name>", "collection name(must be unique)")
  .argument("<path>", "path to codebase")
  .action(async (codebasePath, opts) => {
    const p = path.resolve(codebasePath);
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
  .description("list all available project collections")
  .action(listProjects);

program
  .command("rm")
  .description("delete a project collection")
  .argument("<project>", "project name")
  .action(async (opts) => {
    await deleteProject(opts.project);
  });

module.exports = program;
