import { type APIRoute } from "astro";

export const GET: APIRoute = async ({ url, locals, redirect }) => {
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") || "/";

  if (code) {
    const res = await locals.sb.auth.exchangeCodeForSession(code);

    if (!res.error) return redirect(next);

    console.error(res.error);
  }

  return redirect("/auth/login", 307);
};
