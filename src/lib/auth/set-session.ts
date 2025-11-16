import type { APIContext } from "astro";
import type { Session } from "~/lib/schema";

export async function setSession(ctx: APIContext, data: Session) {
  const session = crypto.randomUUID();

  await ctx.locals.runtime.env.SESSION.put(
    session,
    JSON.stringify({
      ...ctx.locals.session,
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
