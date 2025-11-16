import cloudflare from "@astrojs/cloudflare";
import { defineConfig } from "astro/config";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  output: "server",
  devToolbar: {
    enabled: false
  },
  adapter: cloudflare({
    imageService: "compile"
  }),
  vite: {
    plugins: [mkcert()],
    build: {
      minify: false
    }
  }
});
