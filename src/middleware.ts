import type { Runtime } from "@astrojs/cloudflare";
import { defineMiddleware } from "astro:middleware";
import type { Provider } from "./lib/provider";
import { StoryblokProvider } from "./providers/storyblok";

declare global {
  namespace App {
    interface Locals extends Runtime<Env> {
      providers: Record<string, Provider>;
    }
  }
}

export const onRequest = defineMiddleware((ctx, next) => {
  ctx.locals.providers = {
    storyblok: new StoryblokProvider(
      ctx.locals.runtime.env.STORYBLOK_CLIENT_ID,
      ctx.locals.runtime.env.STORYBLOK_CLIENT_SECRET
    )
  };

  return next();
});
