import * as v from "valibot";

export type Tokens = v.InferOutput<typeof Tokens>;
export const Tokens = v.object({
  access_token: v.string(),
  refresh_token: v.string()
});

export type User = v.InferOutput<typeof User>;
export const User = v.object({
  id: v.pipe(
    v.string(),
    v.transform((id) => id.toString())
  )
});

export type StoryblokMetadata = v.InferOutput<typeof StoryblokMetadata>;
export const StoryblokMetadata = v.object({
  user: v.object({ id: v.number(), friendly_name: v.string() }),
  space: v.object({ id: v.number(), name: v.string() }),
  roles: v.array(v.object({ name: v.string() }))
});

export type ContentfulMetadata = v.InferOutput<typeof ContentfulMetadata>;
export const ContentfulMetadata = v.object({
  user: v.object({
    sys: v.object({ id: v.string() }),
    email: v.string(),
    firstName: v.string(),
    lastName: v.string()
  })
});

export type Session = v.InferOutput<typeof Session>;
export const Session = v.object({
  contentful: v.optional(
    v.object({
      tokens: Tokens,
      metadata: ContentfulMetadata
    })
  ),
  storyblok: v.optional(
    v.object({
      tokens: Tokens,
      metadata: StoryblokMetadata
    })
  )
});
