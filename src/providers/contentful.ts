import * as env from "astro:env/server";
import contentful from "contentful-management";
import { parse } from "valibot";
import { Provider } from "~/lib/provider";
import { ContentfulMetadata, type Tokens } from "~/lib/schema";

export class ContentfulProvider extends Provider<ContentfulMetadata> {
  constructor() {
    super({
      name: "contentful",
      base: "https://be.contentful.com",
      scope: "content_management_manage",
      clientId: env.CONTENTFUL_CLIENT_ID,
      clientSecret: env.CONTENTFUL_CLIENT_SECRET
    });
  }

  createClient(tokens: Tokens) {
    return contentful.createClient({ accessToken: tokens.access_token }, { type: "plain" });
  }

  async getMetadata(tokens: Tokens): Promise<ContentfulMetadata> {
    const client = this.createClient(tokens);
    const user = await client.user.getCurrent();
    return parse(ContentfulMetadata, { user });
  }
}
