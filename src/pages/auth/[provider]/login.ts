import type { APIRoute } from "astro";

export const GET: APIRoute = ({ url, params, locals, cookies, redirect }) => {
  const provider = locals.providers[params.provider as keyof typeof locals.providers];
  if (!provider) return redirect("/404", 307);

  const state = crypto.randomUUID();

  cookies.set("state", state, {
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 10
  });

  const loginUri = provider.getLoginUrl(url, state);

  return redirect(loginUri.href, 307);
};
