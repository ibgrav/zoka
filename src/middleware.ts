import type { Runtime } from "@astrojs/cloudflare";
import { defineMiddleware } from "astro:middleware";
import { Kysely } from "kysely";
import { D1Dialect } from "kysely-d1";
import { parse } from "valibot";
import type { Database } from "~/lib/database";
import { Session } from "~/lib/schema";

declare global {
  namespace App {
    interface Locals extends Runtime<Env> {
      db: Kysely<Database>;
      session: Session | null;
    }
  }
}

export const onRequest = defineMiddleware(async (ctx, next) => {
  ctx.locals.db = new Kysely<Database>({
    dialect: new D1Dialect({
      database: ctx.locals.runtime.env.DB
    })
  });

  const cookie = ctx.cookies.get("session")?.value;
  if (cookie) {
    try {
      const session = await ctx.locals.runtime.env.SESSION.get(cookie);
      if (!session) throw new Error("Session not found");
      ctx.locals.session = parse(Session, JSON.parse(session));
    } catch (error) {
      console.error(JSON.stringify({ error }));
      ctx.cookies.delete("session");
      ctx.locals.session = null;
    }
  }

  return next();
});
