import type { APIRoute } from "astro";
import * as v from "valibot";
import { callback } from "~/lib/auth/callback";
import { setSession } from "~/lib/auth/set-session";
import { storyblok } from "~/lib/providers";

const StoryblokUserInfo = v.object({
  user: v.object({ id: v.number(), friendly_name: v.pipe(v.string(), v.nonEmpty()) }),
  space: v.object({ id: v.number(), name: v.pipe(v.string(), v.nonEmpty()) }),
  roles: v.array(v.object({ name: v.pipe(v.string(), v.nonEmpty()) }))
});

export const GET: APIRoute = (ctx) => {
  return callback(ctx, async (code) => {
    const tokens = await storyblok.onCallback(ctx.url, code);

    const response = await fetch("https://api.storyblok.com/oauth/user_info", {
      headers: { Authorization: `Bearer ${tokens.access_token}` }
    });

    const { user: storyblokUser } = v.parse(StoryblokUserInfo, await response.json());

    let user = await ctx.locals.db
      .selectFrom("users")
      .selectAll()
      .where("storyblok_user_id", "=", storyblokUser.id.toString())
      .executeTakeFirst();

    if (!user) {
      user = await ctx.locals.db
        .insertInto("users")
        .values({ storyblok_user_id: storyblokUser.id.toString() })
        .returningAll()
        .executeTakeFirstOrThrow();
    }

    await setSession(ctx, { user, storyblok: { tokens } });

    return ctx.redirect("/", 307);
  });
};
