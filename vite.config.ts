import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.ts",
      fileName: "index",
      formats: ["es"],
    },

    rollupOptions: {
      external: ["lodash-es", "vitest", "cookie", "date-fns"],
      output: {
        manualChunks: {
          "js-yaml": ["js-yaml"],
        },
      },
    },
  },
});
