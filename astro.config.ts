import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";
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
    plugins: [mkcert(), tailwindcss()],
    build: {
      minify: false
    }
  },
  env: {
    schema: {
      DATABASE_URL: envField.string({ context: "server", access: "secret" }),
      SUPABASE_URL: envField.string({ context: "server", access: "secret" }),
      SUPABASE_PUBLISHABLE_KEY: envField.string({ context: "server", access: "secret" }),
      CONTENTFUL_CLIENT_ID: envField.string({ context: "server", access: "secret" }),
      CONTENTFUL_CLIENT_SECRET: envField.string({ context: "server", access: "secret" }),
      STORYBLOK_CLIENT_ID: envField.string({ context: "server", access: "secret" }),
      STORYBLOK_CLIENT_SECRET: envField.string({ context: "server", access: "secret" }),
      SUPABASE_CLIENT_ID: envField.string({ context: "server", access: "secret" }),
      SUPABASE_CLIENT_SECRET: envField.string({ context: "server", access: "secret" }),
      WORDPRESS_CLIENT_ID: envField.string({ context: "server", access: "secret" }),
      WORDPRESS_CLIENT_SECRET: envField.string({ context: "server", access: "secret" })
    }
  }
});
