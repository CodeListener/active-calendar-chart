import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      formats: ["es", "umd", "iife"],
      entry: resolve(__dirname, "./lib/index.ts"),
      name: "ActiveCalendarChart",
      fileName: "index",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  plugins: [
    vue(),
    dts({
      outputDir: resolve(__dirname, "dist/types"),
      include: "./lib",
      exclude: ["vite-env.d.ts", "./lib/utils.ts"],
    }),
  ],
});
