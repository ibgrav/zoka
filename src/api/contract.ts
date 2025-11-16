import { oc } from "@orpc/contract";
import * as v from "valibot";

const c = oc.errors({
  NOT_FOUND: { status: 404 },
  BAD_REQUEST: { status: 400 },
});

export const contract = {
  auth: {
    login: c.route({ path: "/auth/{provider}/login", method: "GET", outputStructure: "detailed" }).input(
      v.object({
        provider: v.pipe(v.string(), v.nonEmpty()),
      })
    ),
    callback: c.route({ path: "/auth/{provider}/callback", method: "GET", outputStructure: "detailed" }).input(
      v.object({
        provider: v.pipe(v.string(), v.nonEmpty()),
        code: v.pipe(v.string(), v.nonEmpty()),
        state: v.pipe(v.string(), v.nonEmpty()),
      })
    ),
  },
};
