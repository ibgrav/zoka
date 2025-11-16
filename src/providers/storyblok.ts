import { ManagementApiClient } from "@storyblok/management-api-client";
import * as env from "astro:env/server";
import { parse } from "valibot";
import { Provider } from "~/lib/provider";
import { StoryblokMetadata, type Tokens } from "~/lib/schema";

export class StoryblokProvider extends Provider<StoryblokMetadata> {
  constructor() {
    super({
      name: "storyblok",
      base: "https://app.storyblok.com",
      scope: "read_content write_content",
      clientId: env.STORYBLOK_CLIENT_ID,
      clientSecret: env.STORYBLOK_CLIENT_SECRET
    });
  }

  createClient(tokens: Tokens) {
    return new ManagementApiClient({
      token: { oauthToken: `Bearer ${tokens.access_token}` },
      region: "eu"
    });
  }

  async getMetadata(tokens: Tokens): Promise<StoryblokMetadata> {
    const response = await fetch("https://api.storyblok.com/oauth/user_info", {
      headers: { Authorization: `Bearer ${tokens.access_token}` }
    });

    return parse(StoryblokMetadata, await response.json());
  }
}
