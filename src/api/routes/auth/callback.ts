import { encrypt, getCookie, setCookie } from "@orpc/server/helpers";
import { os } from "~/api/orpc";

export const callback = os.auth.callback.handler(async ({ context, input, errors }) => {
  const provider = context.providers[input.provider];
  if (!provider) throw errors.NOT_FOUND();

  if (input.state !== getCookie(context.reqHeaders, "state")) {
    throw errors.BAD_REQUEST();
  }

  const callbackUri = new URL(`/api/${input.provider}/callback`, `https://${context.url.host}`);
  const tokens = await provider.onCallback(input.code, callbackUri);

  const session = crypto.randomUUID();
  const encrypted = await encrypt(JSON.stringify(tokens), context.env.SERVER_SECRET);

  await context.env.SESSION.put(session, encrypted);

  setCookie(context.resHeaders, "session", session, {
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30
  });

  return {
    status: 307,
    headers: {
      Location: "/"
    }
  };
});
