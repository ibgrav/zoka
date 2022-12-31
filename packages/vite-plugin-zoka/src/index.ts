import type { Plugin, ResolvedConfig } from "vite";
import type { ParserPlugin } from "@babel/parser";
import { transformAsync } from "@babel/core";

export default function vitePluginZoka(): Plugin[] {
  let config: ResolvedConfig;

  const jsxPlugin: Plugin = {
    name: "vite:zoka-jsx",
    enforce: "pre",
    config() {
      return {
        optimizeDeps: {
          include: ["zoka/jsx-runtime"],
        },
      };
    },
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    async transform(code, url) {
      const filename = url.split("?", 2)[0];

      if (!/\.[tj]sx?$/.test(filename)) return;

      const parserPlugins: Array<ParserPlugin> = [];

      if (!filename.endsWith(".ts")) parserPlugins.push("jsx");
      if (/\.tsx?$/.test(filename)) parserPlugins.push("typescript");

      const result = await transformAsync(code, {
        filename,
        ast: true,
        root: config.root,
        sourceMaps: true,
        inputSourceMap: undefined,
        parserOpts: {
          sourceType: "module",
          allowAwaitOutsideFunction: true,
          plugins: parserPlugins,
        },
        generatorOpts: {
          decoratorsBeforeExport: true,
        },
        plugins: [
          [
            config.isProduction ? "@babel/plugin-transform-react-jsx" : "@babel/plugin-transform-react-jsx-development",
            {
              runtime: "automatic",
              importSource: "zoka",
            },
          ],
        ],
      });

      if (!result) return;

      return {
        code: result.code || code,
        map: result.map,
      };
    },
  };

  return [jsxPlugin];
}
