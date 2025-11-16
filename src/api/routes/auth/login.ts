import { setCookie } from "@orpc/server/helpers";
import { os } from "~/api/orpc";

export const login = os.auth.login.handler(async ({ context, input, errors }) => {
  const provider = context.providers[input.provider];
  if (!provider) throw errors.NOT_FOUND();

  const state = crypto.randomUUID();

  setCookie(context.resHeaders, "state", state, {
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 10
  });

  const redirectUri = new URL(`/api/${input.provider}/callback`, `https://${context.url.host}`);
  const loginUri = provider.getLoginUrl(state, redirectUri);

  return {
    status: 307,
    headers: {
      Location: loginUri.href
    }
  };
});
