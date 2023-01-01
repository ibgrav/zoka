import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  externals: [],
  clean: true,
  entries: [
    {
      input: "src",
      builder: "mkdist",
      format: "cjs",
      ext: "cjs",
    },
    {
      input: "src",
      builder: "mkdist",
      format: "esm",
      ext: "mjs",
      declaration: true,
    },
  ],
});
