## Migrations

#### Local

```bash
pnpm wrangler d1 migrations apply DB --local
```

#### Preview

```bash
pnpm wrangler d1 migrations apply DB --remote --preview
```

#### Production

```bash
pnpm wrangler d1 migrations apply DB --remote
```
