import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.ts",
      fileName: "vitest-http-matchers",
      formats: ["es"],
    },
  },
});
