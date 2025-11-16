import cloudflare from "@astrojs/cloudflare";
import { defineConfig } from "astro/config";

export default defineConfig({
  output: "server",
  devToolbar: {
    enabled: false
  },
  adapter: cloudflare({
    imageService: "compile"
  }),
  vite: {
    server: {
      allowedHosts: [".ngrok-free.app"]
    }
  }
});
