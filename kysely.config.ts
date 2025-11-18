import { defineConfig } from "kysely-ctl";
import { createDatabase } from "~/lib/database";

export default defineConfig({
  dialect: createDatabase(process.env.DATABASE_URL!).dialect
});
