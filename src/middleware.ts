import type { Runtime } from "@astrojs/cloudflare";
import type { User } from "@supabase/supabase-js";
import { DATABASE_URL } from "astro:env/server";
import { defineMiddleware } from "astro:middleware";
import { createDatabase } from "~/lib/database";
import { createSupabase } from "~/lib/supabase";

declare global {
  namespace App {
    interface Locals extends Runtime<Env> {
      db: ReturnType<typeof createDatabase>;
      sb: ReturnType<typeof createSupabase>;
      user: User | null;
      headers: Headers;
    }
  }
}

export const onRequest = defineMiddleware(async (ctx, next) => {
  ctx.locals.headers = new Headers();
  ctx.locals.db = createDatabase(DATABASE_URL);
  ctx.locals.sb = createSupabase(ctx.request.headers, ctx.locals.headers);

  ctx.locals.user = (await ctx.locals.sb.auth.getUser()).data.user;

  const response = await next();

  for (const [key, value] of ctx.locals.headers.entries()) {
    response.headers.append(key, value);
  }

  return response;
});
