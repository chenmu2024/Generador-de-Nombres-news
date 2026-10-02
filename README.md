# GeneradorDeNombres.net — New Build

Clean-room rebuild based on the new SEO-first product plan. Existing validated Spanish keyword targets are locked. Tool first, content second. Data-driven routes and reusable components. No code copied from the previous website repository.

## Stack
Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Static export

## Local commands
```bash
npm install
npm run dev
npm run lint
npm run seo:audit
npm run build
```


## Cloudflare Pages deployment

Current production build project:

- Pages project URL: `https://generador-de-nombres-news.pages.dev`
- Intended custom domain: `https://generadordenombres.net`
- Production branch: `main`

After every domain or Pages-project change, verify these three checks:

1. `/favoritos` returns the new local-favorites page rather than a 404.
2. `/visuals/hero-culture.svg` is served by the same deployment.
3. The homepage contains the heading `Encuentra un nombre que realmente quieras usar.`

If the `*.pages.dev` URL passes these checks but `generadordenombres.net` does not, the custom domain is still attached to a different/older Pages project. Fix the Cloudflare Pages custom-domain association before treating the release as production.

## Optional AdSense configuration
AdSense is disabled by default. When the site and account are ready, configure these build-time variables in Cloudflare Pages:

```text
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-...
NEXT_PUBLIC_ADSENSE_SLOT_INLINE=...
```

Without both values, no ad slot is rendered. The current placement is after the main results/decision area rather than inside the generate/copy interaction.

## Growth loop
Search Console snapshots can use the interfaces and prioritization helper in `src/data/seoGrowth.ts`. The intended loop is:

Semrush / keyword research → Page Gate → useful page/tool → index → Search Console → near-win query optimization → experiment log.


## Visual system
The production UI follows the approved GeneradorDeNombres brand direction: pale-lavender/white editorial surfaces, violet accents, serif display typography, dark navy interactive workspaces, consistent mobile touch targets, and one shared visual language across homepage, keyword pages, favorites and legal pages.
