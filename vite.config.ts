import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(() => ({
  base: "/ayush-blockchain/", // GitHub Pages base path
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    sourcemap: true, // optional, useful for debugging
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
}));
