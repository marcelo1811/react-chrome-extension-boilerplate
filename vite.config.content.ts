import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    outDir: "dist", // Shared output directory
    emptyOutDir: false, // Do not delete existing content
    rollupOptions: {
      input: './src/content-script.tsx',
      output: {
        entryFileNames: "content/index.js", // Output in 'popup/' folder
        assetFileNames: "content/[name].[ext]",
      },
    },
  },
});
