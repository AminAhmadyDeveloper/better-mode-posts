import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import vercel from "vite-plugin-vercel";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [react(), vercel()],
  ssr: {
    noExternal: ["react-router-dom", "@apollo/client"],
  },
});
