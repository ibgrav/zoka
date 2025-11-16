import contentful from "contentful-management";
import type { Tokens } from "~/lib/schema";

export function createContentfulClient(tokens: Tokens) {
  return contentful.createClient({ accessToken: tokens.access_token }, { type: "plain" });
}
