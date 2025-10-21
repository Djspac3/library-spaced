import { defineConfig } from "tsup";

export default defineConfig({
  // all of them because of my usecases
  format: ["cjs","esm","iife"],
  entry: ["src/index.js"],
  dts: true,
  shims: true,
  skipNodeModulesBundle: true,
  clean: true
})