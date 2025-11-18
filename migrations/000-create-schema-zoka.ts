import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.createSchema("zoka").execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropSchema("zoka").execute();
}
