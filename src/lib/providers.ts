import * as env from "astro:env/server";
import { Provider } from "./provider";

export const contentful = new Provider({
  name: "contentful",
  base: "https://be.contentful.com",
  scope: "content_management_manage",
  clientId: env.CONTENTFUL_CLIENT_ID,
  clientSecret: env.CONTENTFUL_CLIENT_SECRET
});

export const storyblok = new Provider({
  name: "storyblok",
  base: "https://app.storyblok.com",
  scope: "read_content write_content",
  clientId: env.STORYBLOK_CLIENT_ID,
  clientSecret: env.STORYBLOK_CLIENT_SECRET
});
