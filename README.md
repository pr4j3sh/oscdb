# oscar

> open source codebase augmented retrieval

`oscar` is a CLI tool that lets you semantically search and query any open source codebase. It uses embeddings and retrieval to help you understand large projects faster.

## Installation

- Install `oscar` using `npm`

```bash
npm i -g @pr4j3sh/oscar
```

- Install `chromadb`

  - using `pipx`

  ```bash
  pipx install chromadb
  ```

  - Or, using `docker`

  ```bash
  docker run -v ./chroma-data:/data -p 8000:8000 chromadb/chroma
  ```

- Install `llama3.2`
  - on `linux`
  ```bash
  curl -fsSL https://ollama.com/install.sh | sh
  ```
  - for `windows`, `macos`, visit [here](https://github.com/ollama/ollama?tab=readme-ov-file#ollama).

## Usage

- run `llama3.2`

```bash
ollama run llama3.2
```

- run `chromadb`

```bash
chroma run
```

- create collection

```bash
oscar [init | i] -c <collection_name> <path_to_codebase>
```

- query collection

```bash
oscar [query | q] -c <collection_name> "<query>"
```

- list collections

```bash
oscar [list]
```

- delete collection

```bash
oscar [rm] <collection_name>
```

## Reference

- [Langchain Documentation](https://js.langchain.com/docs/introduction/)
- [ChromaDB Documentation](https://docs.trychroma.com/docs/overview/getting-started?lang=typescript)
- [ollama](https://github.com/ollama/ollama)
- [NodeJS Documentation](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)
- [NPM Documentation](https://docs.npmjs.com/)
- [@pr4j3sh/frames](https://pr4j3sh.github.io/frames/)
