# Anantasak Personal Website

Personal portfolio website for Anantasak Charoensuk, focused on project management, tech entrepreneurship, AI automation, blockchain, showcase demos, and writing.

Production: https://anantasak.com/

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Framer Motion
- shadcn/Radix UI components
- MDX blog support
- Sanity client support

## Getting Started

```bash
npm install
npm run dev
```

Common scripts:

```bash
npm run build
npm run lint
npm run preview
```

On Windows PowerShell, if `npm` is blocked by execution policy, use `npm.cmd`:

```bash
npm.cmd run build
npm.cmd run lint
```

## Routes

- `/` - terminal-style landing page
- `/portfolio` - full portfolio page
- `/resume` - resume page
- `/blog` - blog list
- `/blog/:slug` - blog post
- `/openclaw-guide` - OpenClaw installation guide
- `/showcase` - showcase feed
- `/showcase/:slug` - showcase detail
- `/showcase/chatbot-showcase/live` - AI commerce chatbot demo
- `/showcase/syncsocial-demo/live` - SyncSocial demo dashboard

## Project Structure

```text
src/
  components/        Shared components and shadcn UI primitives
  components/showcase2/
                     SyncSocial demo components
  data/              Portfolio and showcase content
  i18n/              Thai/English translations
  pages/             Route-level pages
  sections/          Portfolio page sections
  styles/            Showcase-specific styles
public/
  images/            Public image assets
  videos/            OpenClaw guide GIF/video assets
studio/              Sanity Studio workspace
demo-app/            Standalone Next.js demo source kept as reference
```

## Content Files

- Main profile and portfolio content: `src/data/content.ts`
- Showcase items: `src/data/showcases.ts`
- Translations: `src/i18n/translations.ts`
- Blog registry: `src/blog/posts-registry.ts`
- SEO shell metadata: `index.html`
- Sitemap: `public/sitemap.xml`
- Robots: `public/robots.txt`

## Deployment

The app is configured for Vercel with SPA routing via `vercel.json`.

Build output is generated in `dist/`.

## Notes

- The canonical public domain is `https://anantasak.com/`.
- Keep personal contact details intentional and public-facing only.
- `demo-app/` and `studio/` are separate workspaces and are ignored by the top-level ESLint config.
