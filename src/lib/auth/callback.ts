import type { APIContext } from "astro";

type CallbackHandler = (code: string) => Promise<Response>;

export const callback = async (ctx: APIContext, handler: CallbackHandler): Promise<Response> => {
  const code = ctx.url.searchParams.get("code");
  const state = ctx.url.searchParams.get("state");

  if (!code || !state || state !== ctx.cookies.get("state")?.value) {
    console.error({ error: "Invalid callback request", code, state, stateCookie: ctx.cookies.get("state")?.value });
    return ctx.redirect("/auth/login", 307);
  }

  try {
    return await handler(code);
  } catch (error) {
    console.error(error);
    return ctx.redirect("/auth/login", 307);
  }
};
