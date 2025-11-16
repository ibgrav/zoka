import type { ColumnType, Generated, Selectable } from "kysely";

export interface Database {
  users: UserTable;
}

interface TrackedTable {
  created_at: ColumnType<string, never, never>;
  updated_at: ColumnType<string, never, never>;
}

export type User = Selectable<UserTable>;

export interface UserTable extends TrackedTable {
  id: Generated<number>;
  storyblok_user_id: string | null;
  contentful_user_id: string | null;
}
