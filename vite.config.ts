import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  test: {
    coverage: {
      exclude: [
        "eslint.config.js",
        "postcss.config.cjs",
        "tailwind.config.js",
        "vite.config.ts",
        "src/type.d.ts",
        "src/vite-env.d.ts",
        "src/__tests__/fighter_test_data.ts",
      ],
      reporter: ["text", "html"], // Coverage reporters
    },
  },
});
