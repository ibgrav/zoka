import { defineConfig } from "vite";
import zoka from "./src/index";

export default defineConfig({
  plugins: [zoka()],
});
