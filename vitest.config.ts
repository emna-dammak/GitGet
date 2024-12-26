import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom", // Simulates the browser DOM
      setupFiles: "./vitest.setup.ts", // Path to setup file for global configurations
    },
  })
);
