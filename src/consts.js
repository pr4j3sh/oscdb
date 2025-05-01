const BLOB_TYPE = "application/json";

const CHUNK_SIZE = 1000;

const CHUNK_OVERLAP = 200;

const SYSTEM_TEMPLATE = `Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say that you don't know, don't try to make up an answer.
----------------
{context}`;

module.exports = { BLOB_TYPE, CHUNK_SIZE, CHUNK_OVERLAP, SYSTEM_TEMPLATE };
