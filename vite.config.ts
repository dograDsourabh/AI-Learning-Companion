import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("/node_modules/recharts/")) return "recharts";
          if (id.includes("/node_modules/d3-")) return "d3";
          if (id.includes("/node_modules/framer-motion/") || id.includes("/node_modules/motion-dom/") || id.includes("/node_modules/motion-utils/")) return "motion";
        },
      },
    },
  },
});
