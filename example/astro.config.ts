import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import zoka from "zoka";

export default defineConfig({
  integrations: [zoka()],
  adapter: node({
    mode: "standalone",
  }),
});
