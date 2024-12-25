import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    outDir: "dist", // Shared output directory
    rollupOptions: {
      input: './default_popup.html',
      output: {
        entryFileNames: "popup/index.js", // Output in 'popup/' folder
        assetFileNames: "popup/[name].[ext]",
      },
    },
  },
});
