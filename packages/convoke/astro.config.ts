import { defineConfig } from "astro/config";
import zoka from "./src/integration";

export default defineConfig({
  integrations: [zoka()],
});
