import { defineConfig, splitVendorChunkPlugin } from "vite";
import zoka from "vite-plugin-zoka";

export default defineConfig({
  plugins: [splitVendorChunkPlugin(), zoka()],
  build: {
    modulePreload: false,
    polyfillModulePreload: false,
  },
});
