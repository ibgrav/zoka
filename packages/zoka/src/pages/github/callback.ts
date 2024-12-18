import type { APIRoute } from "astro";
import { createOAuthUserAuth } from "@octokit/auth-oauth-user";
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "astro:env/server";
import { COOKIE } from "../../lib/constants";
import { createEncrypedSession } from "../../lib/session";

export const GET: APIRoute = async (ctx) => {
  const code = ctx.url.searchParams.get("code");
  const state = ctx.url.searchParams.get("state");
  const cookieState = ctx.cookies.get(COOKIE.STATE)?.value;

  if (!code || !state || !cookieState || state !== cookieState) {
    return new Response(null, { status: 400 });
  }

  const redirectUrl = new URL("/github/callback", ctx.url.origin).href;

  const auth = await createOAuthUserAuth({
    code,
    state,
    redirectUrl,
    clientId: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
  })();

  if (auth.token) {
    const jwt = await createEncrypedSession({ token: auth.token });

    ctx.cookies.set(COOKIE.SESSION, jwt, {
      secure: import.meta.env.PROD,
      maxAge: 60 * 60 * 8, // 8h
      sameSite: "lax",
      httpOnly: true,
      path: "/",
    });
  }

  return ctx.redirect("/");
};
