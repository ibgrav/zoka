import { defineMiddleware } from "astro:middleware";
import { getEncryptedSession } from "../lib/session";
import { COOKIE } from "../lib/constants";

export const sessionMiddleware = defineMiddleware(async (ctx, next) => {
  ctx.locals.session = { token: "" };

  const sessionCookie = ctx.cookies.get(COOKIE.SESSION)?.value;

  if (sessionCookie) {
    const session = await getEncryptedSession(sessionCookie);

    if (!session.token) {
      ctx.cookies.delete(COOKIE.SESSION); // delete invalid session cookie
    }

    ctx.locals.session = session;
  }

  return next();
});
