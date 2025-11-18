import type { APIContext } from "astro";
import * as v from "valibot";

export const User = v.object({
  id: v.string()
});

export type Tokens = v.InferOutput<typeof Tokens>;
export const Tokens = v.object({
  access_token: v.pipe(v.string(), v.nonEmpty()),
  refresh_token: v.optional(v.pipe(v.string()))
});

export type Session = v.InferOutput<typeof Session>;
export const Session = v.object({
  user: User,
  contentful: v.optional(v.object({ tokens: Tokens })),
  storyblok: v.optional(v.object({ tokens: Tokens })),
  wordpress: v.optional(v.object({ tokens: Tokens })),
  supabase: v.optional(v.object({ tokens: Tokens }))
});

export async function setSession(ctx: APIContext, data: Session) {
  const session = crypto.randomUUID();

  await ctx.locals.runtime.env.SESSION.put(
    session,
    JSON.stringify({
      // ...ctx.locals.session,
      ...data
    }),
    { expirationTtl: 60 * 60 * 24 * 30 }
  );

  ctx.cookies.set("session", session, {
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30
  });
}
