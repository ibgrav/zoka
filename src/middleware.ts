import type { Runtime } from "@astrojs/cloudflare";
import * as env from "astro:env/server";
import { defineMiddleware } from "astro:middleware";
import { parse } from "valibot";
import { Provider } from "~/lib/provider";
import { SessionTokens } from "~/lib/schema";

declare global {
  namespace App {
    interface Locals extends Runtime<Env> {
      tokens: SessionTokens;
      providers: Record<string, Provider>;
    }
  }
}

export const onRequest = defineMiddleware(async (ctx, next) => {
  const session = ctx.cookies.get("session")?.value;
  if (session) {
    const tokens = await ctx.locals.runtime.env.SESSION.get(session);
    if (tokens) {
      try {
        ctx.locals.tokens = parse(SessionTokens, JSON.parse(tokens));
      } catch {
        ctx.cookies.delete("session");
        ctx.locals.tokens = {};
      }
    }
  }

  ctx.locals.providers = {
    contentful: new Provider({
      name: "contentful",
      base: "https://be.contentful.com",
      scope: "content_management_manage",
      clientId: env.CONTENTFUL_CLIENT_ID,
      clientSecret: env.CONTENTFUL_CLIENT_SECRET
    }),
    storyblok: new Provider({
      name: "storyblok",
      base: "https://app.storyblok.com",
      scope: "read_content write_content",
      clientId: env.STORYBLOK_CLIENT_ID,
      clientSecret: env.STORYBLOK_CLIENT_SECRET
    })
  };

  return next();
});
