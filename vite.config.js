import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/oscdb/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        submit: resolve(__dirname, "submit/index.html"),
        communities: resolve(__dirname, "communities/index.html"),
      },
    },
  },
});
