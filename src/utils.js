const { ChromaClient } = require("chromadb");

const client = new ChromaClient({ path: "http://localhost:8000" });

async function listProjects() {
  const collections = await client.listCollections();
  console.log("\navailable projects:\n");
  collections.forEach((col) => console.log(`- ${col}`));
}

async function deleteProject(project) {
  await client.deleteCollection({ name: project });
  console.log(`\ndeleted project: ${projectName}`);
}

module.exports = { listProjects, deleteProject };
