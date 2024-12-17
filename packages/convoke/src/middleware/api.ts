import { defineMiddleware } from "astro:middleware";
import { createGithubApi } from "../api/github";

export const apiMiddleware = defineMiddleware(async (ctx, next) => {
  ctx.locals.api = createGithubApi(ctx);

  return next();
});
