# The Protocol of the Architect — Astro Site Scaffold

This scaffold converts the existing prototype repository into a static Astro site for GitHub Pages.

## Target deployment

- Site: `https://tron-protocol.github.io`
- Base path: `/protocol-of-the-architect`
- Final URL: `https://tron-protocol.github.io/protocol-of-the-architect`

## Local commands

```bash
npm install
npm run validate
npm run generate:support
npm run build
npm run preview
```

## Migration notes

This repository already contains prototype files: `data/`, `index.html`, `graph.html`, `robots.txt`, `sitemap.xml`, and `README.md`.

Do not overwrite them blindly. Use a migration branch, review `graph.html`, then remove or supersede it. The initial Astro build does not carry forward `graph.html` as unmanaged HTML.

## Public trace policy

Technical trace, raw IDs, provenance, audit records, and internal workflow history are hidden from public rendering.
