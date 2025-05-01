const { SYSTEM_TEMPLATE } = require("./consts");
const model = require("./model");
const { createStore } = require("./store");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const {
  RunnablePassthrough,
  RunnableSequence,
} = require("@langchain/core/runnables");
const { StringOutputParser } = require("@langchain/core/output_parsers");
const { createSpinner } = require("nanospinner");
const process = require("process");
const { asString } = require("./utils");

async function query(collection, q) {
  const store = createStore(collection);

  const retriever = store.asRetriever();

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", SYSTEM_TEMPLATE],
    ["human", "{question}"],
  ]);

  const chain = RunnableSequence.from([
    {
      context: retriever.pipe(asString),
      question: new RunnablePassthrough(),
    },
    prompt,
    model,
    new StringOutputParser(),
  ]);

  const spinner = createSpinner(`${q}`).start();
  try {
    const stream = await chain.stream(q);
    spinner.success(">");
    for await (const chunk of stream) {
      process.stdout.write(chunk);
    }
    console.log();
  } catch (error) {
    spinner.error(`${error.message}`);
    process.exit(1);
  }
}

module.exports = query;
