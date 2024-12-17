import type { GitTree } from "./schema";

interface GetGitTreeArgs {
  owner: string;
  repo: string;
  sha: string;
}

export interface API {
  getGitTree: (args: GetGitTreeArgs) => Promise<GitTree[]>;
}
