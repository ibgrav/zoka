import type { APIRoute } from "astro";

export const GET: APIRoute = ({ url, params, locals, cookies, redirect }) => {
  const provider = locals.providers[params.provider!];
  if (!provider) return redirect("/404", 307);

  const state = crypto.randomUUID();

  cookies.set("state", state, {
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 10
  });

  const redirectUri = new URL(`/auth/${params.provider}/callback`, url.origin);
  const loginUri = provider.getLoginUrl(state, redirectUri);

  return redirect(loginUri.href, 307);
};
