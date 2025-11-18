import { Kysely, PostgresDialect } from "kysely";
import type { DB } from "kysely-codegen";
import { Pool } from "pg";

export function createDatabase(connectionString: string) {
  const dialect = new PostgresDialect({ pool: new Pool({ connectionString }) });
  const database = new Kysely<DB>({ dialect });
  return { dialect, database };
}
