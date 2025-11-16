import type { APIRoute } from "astro";
import { setState } from "~/lib/auth/set-state";
import { storyblok } from "~/lib/providers";

export const GET: APIRoute = ({ url, cookies, redirect }) => {
  const state = setState(cookies);
  const loginUri = storyblok.getLoginUrl(url, state);
  return redirect(loginUri.href, 307);
};
