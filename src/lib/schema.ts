import * as v from "valibot";

export const User = v.object({
  id: v.string()
});

export type Tokens = v.InferOutput<typeof Tokens>;
export const Tokens = v.object({
  access_token: v.pipe(v.string(), v.nonEmpty()),
  refresh_token: v.optional(v.pipe(v.string()))
});

export type Session = v.InferOutput<typeof Session>;
export const Session = v.object({
  user: User,
  contentful: v.optional(v.object({ tokens: Tokens })),
  storyblok: v.optional(v.object({ tokens: Tokens })),
  wordpress: v.optional(v.object({ tokens: Tokens })),
  supabase: v.optional(v.object({ tokens: Tokens }))
});
