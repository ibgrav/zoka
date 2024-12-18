import type { AstroIntegration } from "astro";
import { envField } from "astro/config";

const resolve = (path: string) => new URL(path, import.meta.url).pathname;

export default function zokaAstroIntegration(): AstroIntegration {
  return {
    name: "zoka",
    hooks: {
      "astro:config:setup": (opts) => {
        opts.updateConfig({
          output: "server",
          security: { checkOrigin: true },
          env: {
            schema: {
              JWT_SECRET: envField.string({ access: "secret", context: "server" }),
              GITHUB_REPO_ORG: envField.string({ access: "public", context: "server" }),
              GITHUB_REPO_NAME: envField.string({ access: "public", context: "server" }),
              GITHUB_CLIENT_ID: envField.string({ access: "public", context: "server" }),
              GITHUB_CLIENT_SECRET: envField.string({ access: "secret", context: "server" }),
            },
          },
        });

        opts.addMiddleware({
          order: "pre",
          entrypoint: resolve("middleware/pre.ts"),
        });

        opts.injectRoute({
          pattern: "/[...path]",
          entrypoint: resolve("pages/[...path].astro"),
        });

        opts.injectRoute({
          pattern: "/login",
          entrypoint: resolve("pages/login.astro"),
        });

        opts.injectRoute({
          pattern: "/github/callback",
          entrypoint: resolve("pages/github/callback.ts"),
        });
      },

      "astro:config:done": (opts) => {
        opts.injectTypes({
          filename: "locals.d.ts",
          content: `import("zoka/astro/locals")`,
        });
      },
    },
  };
}
