import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// ⚠️ Replace "ayush-blockchain-main" with your actual GitHub repo name if different
export default defineConfig({
  plugins: [react()],
  base: "/ayush-blockchain-main/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
