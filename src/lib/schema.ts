import * as v from "valibot";
import type * as DB from "./database";

export const User = v.object({
  id: v.number(),
  storyblok_user_id: v.nullable(v.string()),
  contentful_user_id: v.nullable(v.string()),
  created_at: v.pipe(v.string(), v.nonEmpty()),
  updated_at: v.pipe(v.string(), v.nonEmpty())
}) satisfies v.GenericSchema<DB.User>;

export type Tokens = v.InferOutput<typeof Tokens>;
export const Tokens = v.object({
  access_token: v.pipe(v.string(), v.nonEmpty()),
  refresh_token: v.pipe(v.string(), v.nonEmpty())
});

export type Session = v.InferOutput<typeof Session>;
export const Session = v.object({
  user: User,
  contentful: v.optional(
    v.object({
      tokens: Tokens
    })
  ),
  storyblok: v.optional(
    v.object({
      tokens: Tokens
    })
  )
});
