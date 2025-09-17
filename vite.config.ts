import { defineConfig } from "vite";

import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(() => ({
  base: "/ayush-blockchain/", 
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    outDir: "docs",
    assetsDir: "assets",
    sourcemap: true,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
}));
