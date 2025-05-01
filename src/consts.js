const BLOB_TYPE = "application/json";

const CHUNK_SIZE = 1000;

const CHUNK_OVERLAP = 200;

const SYSTEM_TEMPLATE = `You are a helpful assistant specialized in answering questions about the codebase provided to you in the context.
Use the following context to answer the question as accurately and concisely as possible.

Do not try to bring any foreign knowledge. However, general understanding is appreciated.

----------------
{context}`;

module.exports = { BLOB_TYPE, CHUNK_SIZE, CHUNK_OVERLAP, SYSTEM_TEMPLATE };
