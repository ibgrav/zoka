import type { AstroCookies } from "astro";

export function setState(cookies: AstroCookies) {
  const state = crypto.randomUUID();

  cookies.set("state", state, {
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 10
  });

  return state;
}
