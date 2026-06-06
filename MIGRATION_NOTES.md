# Migration Notes

## Branch
Create a branch before applying this scaffold:

```bash
git checkout -b astro-site-migration
```

## Existing prototype files

- `index.html`: review, then supersede with `src/pages/index.astro`.
- `graph.html`: review, then remove/supersede. Do not carry forward as unmanaged HTML. Do not rebuild as a graph route in the initial Astro build.
- `robots.txt`: replace with generated `public/robots.txt`.
- `sitemap.xml`: replace with generated `public/sitemap.xml`.
- `data/`: inspect and migrate any useful material before replacing or moving.
- `README.md`: replace/update with the Astro build instructions.

## GitHub Pages
Use GitHub Actions as the Pages source.
