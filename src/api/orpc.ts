import { implement } from "@orpc/server";
import type { RequestHeadersPluginContext, ResponseHeadersPluginContext } from "@orpc/server/plugins";
import type { AstroSession } from "astro";
import { contract } from "~/api/contract";
import type { Provider } from "~/lib/provider";

interface Context extends RequestHeadersPluginContext, ResponseHeadersPluginContext {
  url: URL;
  env: Env;
  session: AstroSession;
  providers: Record<string, Provider>;
}

export const os = implement(contract).$context<Context>();
