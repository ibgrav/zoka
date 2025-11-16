## OAuth Apps

#### Contentful

- Production: https://app.contentful.com/account/profile/developers/applications/19EOmcUJPEAKODzj3tkiLR
- Local: https://app.contentful.com/account/profile/developers/applications/39bzaMQlIvk3Arsurmati7

#### Storyblok

- Production: https://app.storyblok.com/#/partner/apps/112836534638282/edit

#### Wordpress

- Production: https://developer.wordpress.com/apps/128260
- Local: https://developer.wordpress.com/apps/128261

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
