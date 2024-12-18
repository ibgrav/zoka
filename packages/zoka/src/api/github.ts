import type { APIContext } from "astro";
import { Octokit } from "@octokit/rest";
import type { GitApi } from "../types/api";
import { createGithubGetGitTreeApi } from "./github/get-git-tree";

export function createGithubApi(ctx: APIContext): GitApi {
  const octokit = new Octokit({ auth: ctx.locals.session?.token });

  return {
    getGitTree: createGithubGetGitTreeApi(octokit),
  };
}
