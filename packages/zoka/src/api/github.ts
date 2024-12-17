import type { APIContext } from "astro";
import type { API } from "../types/api";
import type { GitTree } from "../types/schema";
import { Octokit } from "@octokit/rest";

export function createGithubApi(ctx: APIContext): API {
  const octokit = new Octokit({ auth: ctx.locals.session?.token });

  return {
    async getGitTree({ owner, repo, sha }) {
      try {
        const response = await octokit.rest.git.getTree({ repo, owner, tree_sha: sha });

        return response.data.tree.filter((tree) => {
          return tree.path && tree.sha && (tree.type === "blob" || tree.type === "tree");
        }) as GitTree[];
      } catch (e) {
        console.error(e);
      }

      return [];
    },
  };
}
