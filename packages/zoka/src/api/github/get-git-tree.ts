import type { Octokit } from "@octokit/rest";
import type { GitApi } from "../../types/api";
import type { GitTree } from "../../types/schema";

export function createGithubGetGitTreeApi(octokit: Octokit): GitApi["getGitTree"] {
  return async function getGitTree({ owner, repo, sha }) {
    try {
      const response = await octokit.rest.git.getTree({ repo, owner, tree_sha: sha });

      return response.data.tree.filter((tree) => {
        return tree.path && tree.sha && (tree.type === "blob" || tree.type === "tree");
      }) as GitTree[];
    } catch (e) {
      console.error(e);
    }

    return [];
  };
}
