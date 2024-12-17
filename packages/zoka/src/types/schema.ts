export interface Session extends Record<string, string> {
  token: string;
}

export interface GitTree {
  type: "blob" | "tree";
  path: string;
  sha: string;
}
