import cloudflare from "@astrojs/cloudflare";
import { defineConfig, envField } from "astro/config";
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
  },
  env: {
    schema: {
      CONTENTFUL_CLIENT_ID: envField.string({ context: "server", access: "secret" }),
      CONTENTFUL_CLIENT_SECRET: envField.string({ context: "server", access: "secret" }),
      STORYBLOK_CLIENT_ID: envField.string({ context: "server", access: "secret" }),
      STORYBLOK_CLIENT_SECRET: envField.string({ context: "server", access: "secret" })
    }
  }
});
