# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are prospective employers or hirers evaluating Anantasak Charoensuk for work opportunities, projects, partnerships, or service engagements. They arrive needing to understand credibility, capability, proof of work, and how to contact or evaluate him quickly.

Secondary audiences inferred from the repository include people reading Anantasak's writing, exploring AI automation demos, or reviewing his resume and project history.

## Product Purpose

This website is Anantasak Charoensuk's personal portfolio. It exists to present his background, current work, technical interests, product demos, writing, and contact paths in one public web presence at `https://anantasak.com/`.

Success means a prospective hirer can quickly understand who Anantasak is, what kind of tech and business work he does, what proof exists, and which next page or contact action to take.

## Positioning

Confirmed positioning: tech entrepreneur portfolio.

The site should present Anantasak as a tech entrepreneur with project coordination, business development, AI automation, product demo, and knowledge-sharing experience. Its strongest differentiator is not only listing credentials, but pairing personal career context with interactive showcases and practical guides that demonstrate how Anantasak thinks and builds.

## Operating Context

The product is evaluated in a hiring or project-discovery context. Visitors may scan the landing page first, then move to portfolio, resume, showcase demos, blog posts, or social/contact links.

The repository evidence shows these important routes:

- `/` for the main landing page.
- `/portfolio` for the full portfolio.
- `/resume` for resume viewing and PDF export.
- `/blog` and `/blog/:slug` for writing.
- `/openclaw-guide` for an OpenClaw installation guide.
- `/showcase` and `/showcase/:slug` for selected demos.
- `/showcase/chatbot-showcase/live` for an AI commerce chatbot demo.
- `/showcase/syncsocial-demo/live` for a social publishing dashboard demo.

## Capabilities and Constraints

The site is a React, TypeScript, Vite, Tailwind CSS, React Router web app. It uses Framer Motion, Radix/shadcn-style UI primitives, MDX/Sanity blog support, and static assets from `public/`, `demo-app/`, and Thai-named showcase folders.

Confirmed capabilities include a terminal-style landing page, portfolio sections, resume export, blog listing/detail pages, OpenClaw guide content, showcase feed/detail pages, and interactive demo pages.

Durable constraints confirmed by the user:

- The primary audience is hirers or employers.
- The positioning is a tech entrepreneur portfolio.

Open decision:

- The user is not yet sure which specific assets, facts, or brand elements must be preserved beyond the existing public identity and product purpose. Future work should ask before removing or materially changing profile facts, domain identity, route structure, social/contact paths, showcase demos, or public proof assets.

## Brand Commitments

Confirmed name: Anantasak Charoensuk.

Public domain: `https://anantasak.com/`.

Repository content presents Anantasak as a Bangkok-based project coordinator, tech entrepreneur, content creator, generalist, and AI automation builder. The existing content mixes English and Thai, especially in showcase and blog experiences.

Existing public contact and social paths are part of the product evidence and should be treated intentionally:

- LinkedIn: `https://www.linkedin.com/in/anantasak-charoensuk-675544222/`
- GitHub: `https://github.com/anantasak-c`
- Facebook: `https://www.facebook.com/m.anan.tasuk/`
- Instagram: `https://www.instagram.com/m_anantasak/`
- Email: `anantasuk000@gmail.com`

## Evidence on Hand

Repository evidence:

- `README.md` describes the website, stack, routes, and deployment notes.
- `src/data/content.ts` contains profile, social links, skills, work history, projects, education, and tech stack content.
- `src/data/showcases.ts` contains showcase descriptions, highlights, stacks, galleries, and live demo routes.
- `src/pages/LandingPage.tsx` contains the incumbent terminal-style first page and routes to OpenClaw, showcase, and blog surfaces.
- `src/pages/ResumePage.tsx` contains resume presentation and PDF export behavior.
- `src/pages/BlogListPage.tsx` and `src/pages/BlogPostPage.tsx` define the blog experience.
- `public/images/` and `public/videos/` contain public visual/media assets.

Evidence not yet confirmed:

- No testimonials, client logos, pricing, formal case-study metrics, or accessibility standard have been confirmed as durable product facts. Future work must not fabricate them.

## Product Principles

1. Help hirers understand fit quickly: identity, role, proof, and contact paths should be easy to find.
2. Treat demos and guides as proof of thinking, not decoration.
3. Preserve factual credibility over inflated claims.
4. Keep Thai and English content usable for the audiences already represented in the site.
5. Make future design decisions support the tech entrepreneur portfolio positioning.

## Accessibility & Inclusion

Open decision: no product-specific accessibility requirement has been confirmed yet. Because this is a public web portfolio for hirers, future implementation should preserve keyboard navigation, readable contrast, responsive layouts, and meaningful link/image text when surfaces are changed.
