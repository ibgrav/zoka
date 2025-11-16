import type { APIRoute } from "astro";
import * as v from "valibot";
import { callback } from "~/lib/auth/callback";
import { setSession } from "~/lib/auth/set-session";
import { wordpress } from "~/lib/providers";

const WordpressUserInfo = v.object({
  ID: v.number()
});

export const GET: APIRoute = (ctx) => {
  return callback(ctx, async (code) => {
    const tokens = await wordpress.onCallback(ctx.url, code);

    const response = await fetch("https://public-api.wordpress.com/rest/v1/me", {
      headers: { Authorization: `Bearer ${tokens.access_token}` }
    });

    const { ID } = v.parse(WordpressUserInfo, await response.json());

    let user = await ctx.locals.db
      .selectFrom("users")
      .selectAll()
      .where("wordpress_user_id", "=", ID.toString())
      .executeTakeFirst();

    if (!user) {
      user = await ctx.locals.db
        .insertInto("users")
        .values({ wordpress_user_id: ID.toString() })
        .returningAll()
        .executeTakeFirstOrThrow();
    }

    await setSession(ctx, { user, wordpress: { tokens } });

    return ctx.redirect("/dash", 307);
  });
};
