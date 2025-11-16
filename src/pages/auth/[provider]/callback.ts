import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url, params, locals, cookies, redirect }) => {
  const name = params.provider;
  const provider = name ? locals.providers[name] : null;
  if (!name || !provider) return redirect("/404", 307);

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code || !state || state !== cookies.get("state")?.value) {
    return redirect("/404", 307);
  }

  try {
    const tokens = await provider.onCallback(url, code);

    const session = crypto.randomUUID();

    await locals.runtime.env.SESSION.put(session, JSON.stringify({ ...locals.tokens, [name]: tokens }), {
      expirationTtl: 60 * 60 * 24 * 30
    });

    cookies.set("session", session, {
      path: "/",
      secure: true,
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30
    });

    return redirect("/", 307);
  } catch (e) {
    console.error(e);
    return redirect("/", 307);
  }
};
