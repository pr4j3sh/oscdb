const { program } = require("commander");
const init = require("./init");
const query = require("./query");
const path = require("path");
const { listProjects, deleteProject } = require("./utils");

program
  .name("oscar")
  .description("augmented retrival for open source projects")
  .version("1.0.0");

program
  .command("init")
  .alias("i")
  .description("creates a project store in vector database")
  .requiredOption("-p, --project <name>", "project name")
  .argument("<path>", "path to codebase")
  .action(async (codePath, opts) => {
    const absPath = path.resolve(codePath);
    await init(opts.project, absPath);
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
