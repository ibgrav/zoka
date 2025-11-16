CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  contentful_user_id TEXT,
  storyblok_user_id TEXT,
  wordpress_user_id TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
