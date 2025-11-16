import type { Runtime } from "@astrojs/cloudflare";
import { defineMiddleware } from "astro:middleware";
import { parse } from "valibot";
import { Session } from "~/lib/schema";
import { ContentfulProvider } from "./providers/contentful";
import { StoryblokProvider } from "./providers/storyblok";

declare global {
  namespace App {
    interface Locals extends Runtime<Env> {
      session: Session;
      providers: {
        contentful: ContentfulProvider;
        storyblok: StoryblokProvider;
      };
    }
  }
}

export const onRequest = defineMiddleware(async (ctx, next) => {
  ctx.locals.providers = {
    contentful: new ContentfulProvider(),
    storyblok: new StoryblokProvider()
  };

  const cookie = ctx.cookies.get("session")?.value;
  if (cookie) {
    const session = await ctx.locals.runtime.env.SESSION.get(cookie);
    if (session) {
      try {
        ctx.locals.session = parse(Session, JSON.parse(session));
      } catch {
        ctx.cookies.delete("session");
        ctx.locals.session = {};
      }
    }
  }

  return next();
});
