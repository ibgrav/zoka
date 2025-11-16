import type { APIRoute } from "astro";
import { callback } from "~/lib/auth/callback";
import { setSession } from "~/lib/auth/set-session";
import { createContentfulClient } from "~/lib/contentful/create-client";
import { contentful } from "~/lib/providers";

export const GET: APIRoute = (ctx) => {
  return callback(ctx, async (code) => {
    const tokens = await contentful.onCallback(ctx.url, code);

    const client = createContentfulClient(tokens);
    const contentfulUser = await client.user.getCurrent();

    let user = await ctx.locals.db
      .selectFrom("users")
      .selectAll()
      .where("contentful_user_id", "=", contentfulUser.sys.id)
      .executeTakeFirst();

    if (!user) {
      user = await ctx.locals.db
        .insertInto("users")
        .values({ contentful_user_id: contentfulUser.sys.id })
        .returningAll()
        .executeTakeFirstOrThrow();
    }

    await setSession(ctx, { user, contentful: { tokens } });

    return ctx.redirect("/dash", 307);
  });
};
