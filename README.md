# Ajo Family website

The public marketing site for Ajo Family, built with Next.js App Router, TypeScript, Tailwind CSS, Motion, Bricolage Grotesque, and Outfit.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Public configuration

All variables are optional. Store-search destinations are used when exact listing URLs are not configured.

```dotenv
NEXT_PUBLIC_SITE_URL=https://www.example.com
NEXT_PUBLIC_BASE_URL=https://api.example.com/api/v1
NEXT_PUBLIC_APP_STORE_URL=https://apps.apple.com/app/your-listing
NEXT_PUBLIC_PLAY_STORE_URL=https://play.google.com/store/apps/details?id=your.app
```

- `NEXT_PUBLIC_SITE_URL` supplies the canonical origin for absolute metadata.
- `NEXT_PUBLIC_BASE_URL` supplies the public API origin used by the server-rendered FAQ request.
- `NEXT_PUBLIC_APP_STORE_URL` and `NEXT_PUBLIC_PLAY_STORE_URL` replace the safe Ajo Family store-search fallbacks.

FAQ data is cached and revalidated every five minutes. If the API is unavailable or returns no entries, the homepage shows a customer-facing in-app support message.

## Validation

```bash
npm run lint
npx tsc --noEmit
npm run build
```
