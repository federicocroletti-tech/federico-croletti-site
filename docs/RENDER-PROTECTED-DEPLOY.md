# Render protected deploy

This project must be deployed as a Render **Web Service**, not as a Static Site, when it contains sensitive evidence or private analytics data.

## Security model

- Angular is built normally with `npm run build`.
- Render starts `npm run start:secure`.
- `server/render-auth-server.cjs` serves `dist/federico-croletti-site/browser` behind server-side Basic Auth.
- The server refuses to start if credentials are not configured.
- `/healthz` is unauthenticated for platform health checks only.
- All app routes, assets and SPA fallbacks require credentials.
- Security headers include CSP, `frame-ancestors 'none'`, `nosniff`, `no-referrer` and `X-Robots-Tag: noindex`.

## Required Render environment variables

Set these in Render as secret environment variables:

- `BASIC_AUTH_USERNAME`
- `BASIC_AUTH_PASSWORD`

Use a long unique password generated outside the repository. Do not commit real credentials.

## Render settings

- Service type: Web Service
- Runtime: Node
- Branch: `cro-dual-funnels-analytics`
- Build command: `npm ci && npm run build`
- Start command: `npm run start:secure`

## Why not Keycloak here

Keycloak is useful for multi-user SSO, roles, audit and enterprise identity federation. For this single protected Render deployment, Basic Auth at the Node edge gives stronger protection than any client-side-only auth and avoids introducing an identity server with its own maintenance and secret surface.

If the project grows to multiple users or role-based access, move to OIDC with Keycloak, Auth0, Microsoft Entra ID or another IdP and validate tokens server-side.