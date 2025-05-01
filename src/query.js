const { SYSTEM_TEMPLATE } = require("./consts");
const model = require("./model");
const { createStore } = require("./store");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const {
  RunnablePassthrough,
  RunnableSequence,
} = require("@langchain/core/runnables");
const { StringOutputParser } = require("@langchain/core/output_parsers");

const formatDocumentsAsString = (documents) => {
  return documents.map((document) => document.pageContent).join("\n\n");
};

async function query(project, q) {
  const store = createStore(project);

  const storeRetriever = store.asRetriever();

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", SYSTEM_TEMPLATE],
    ["human", "{question}"],
  ]);

  const chain = RunnableSequence.from([
    {
      context: storeRetriever.pipe(formatDocumentsAsString),
      question: new RunnablePassthrough(),
    },
    prompt,
    model,
    new StringOutputParser(),
  ]);

  const answer = await chain.invoke(q);

  console.log({ answer });
}

module.exports = query;
