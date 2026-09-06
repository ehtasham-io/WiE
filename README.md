# IEEE WiE — UET Narowal Student Branch Website

The official website for the IEEE Women in Engineering (WiE) student chapter
at UET Narowal. Built with Next.js and Sanity CMS so that **non-technical
exec committee members can update content — events, team, settings —
without touching code or redeploying.**

If you're inheriting this project from a previous exec committee, read this
whole file before changing anything. It's short.

---

## What this actually is

- **Website code** (this repo) — pages, layout, styling. Lives on GitHub,
  deployed on Vercel. You only touch this for structural/visual changes.
- **Content** (events, team members, site settings) — lives in **Sanity**,
  a separate content dashboard ("Studio"). This is where you'll do 95% of
  your day-to-day updates, and it requires zero coding.

Studio is embedded right inside this site at **`/studio`** — e.g.
`https://<your-deployed-url>/studio`. Log in with the Sanity account that
has access to this project (ask the outgoing exec committee to invite your
account if you don't have one).

---

## Day-to-day tasks (no code required — do these in `/studio`)

### Add or edit an event
Studio → **Event** → fill in title, date (use the date picker — don't type
free text), category, description, banner image → **Publish**.
It appears on the site automatically within ~60 seconds.

### Add or edit a team member
Studio → **Executive Committee Member** → name, role, display order
(lower number = shown first), headshot → **Publish**.

### Add a founder / legacy member
Studio → **Legacy & Founders** → same idea, plus tenure and a couple of
sentences of achievements.

### Update the WhatsApp link, socials, contact email, or homepage stats
Studio → **Site Settings** (pinned at the top, not in a list — there's
only ever one). Update the field, publish. This immediately updates the
navbar, footer, and homepage everywhere those values are used — no
redeploy needed. This is exactly why these were moved off hardcoded values
in the code.

**Important:** WhatsApp group invite links expire/reset periodically.
When that happens, generate a new invite link from WhatsApp and paste it
into Site Settings → WhatsApp Group Invite Link. That's the only place it
needs to change.

---

## Local development (code changes only)

Prerequisites: Node.js 20+, npm.

```bash
git clone <this-repo-url>
cd uet-narowal-wie
npm install
```

Create `.env.local` in the project root (ask a previous maintainer for the
actual values, or find them in the Vercel project's environment variables):

```
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_PROJECT_ID="g5vgs8oi"
```

Run the dev server:

```bash
npm run dev
```

Open http://localhost:3000 for the site, http://localhost:3000/studio for
the CMS.

Other scripts:
- `npm run build` — production build (Vercel runs this automatically on push)
- `npm run lint` — ESLint

---

## Project structure

```
src/
  app/                 Pages (Next.js App Router)
    page.tsx           Homepage
    events/page.tsx    Full events archive
    legacy/page.tsx     "Hall of Fame" for founders/ex-execs
    studio/[[...tool]]  Embedded Sanity Studio — don't edit this route
  components/          Navbar, Footer, and animation wrapper components
  lib/                 Small shared helpers (e.g. date formatting)
  sanity/
    schemaTypes/       Content model definitions (what fields Studio shows)
    lib/               Sanity client setup
    structure.ts        Controls how documents are organized in Studio's sidebar
    types.ts            TypeScript types matching the GROQ queries below
sanity.config.ts       Studio configuration (plugins, singleton handling)
```

## Content model (defined in `src/sanity/schemaTypes/`)

| Type | Purpose | Singleton? |
|---|---|---|
| `event` | Workshops, seminars, bootcamps | No — one doc per event |
| `teamMember` | Current exec committee | No — one doc per person |
| `legacyMember` | Founders / past exec (Hall of Fame page) | No — one doc per person |
| `siteSettings` | WhatsApp link, socials, contact email, homepage stats, group photo | **Yes — only one should ever exist.** Studio is configured to prevent creating a second one. |

If you ever add a new content type that should also be a singleton (e.g. a
future "Homepage Hero" doc), follow the existing pattern in
`src/sanity/structure.ts` and `sanity.config.ts` (`singletonTypes` set) —
don't just add it as a normal document type or someone will eventually
create a duplicate.

---

## Deployment

Hosted on **Vercel**, connected to this repo's main branch — pushing to
`main` auto-deploys. Environment variables (the same two from `.env.local`)
are set in the Vercel project dashboard, not committed to git.

---

## Known limitations / good next projects for a future intern

- No per-event pages — event links point to an anchor on `/events`, not a
  dedicated URL with its own social-share preview image.
- No sitemap.xml or structured data for search engines.
- Visual design currently doesn't have a strongly distinct brand identity
  tied to IEEE WiE / Narowal specifically — a good redesign project.
- Homepage/events pages re-fetch on a 60-second timer (ISR). A more
  efficient approach would be a Sanity webhook that triggers on-demand
  revalidation only when content is actually published.
