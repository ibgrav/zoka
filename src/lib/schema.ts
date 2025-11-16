import * as v from "valibot";

export type Tokens = v.InferOutput<typeof Tokens>;
export const Tokens = v.object({
  access_token: v.string(),
  refresh_token: v.string()
});

export type SessionTokens = v.InferOutput<typeof SessionTokens>;
export const SessionTokens = v.record(v.string(), v.optional(Tokens));
