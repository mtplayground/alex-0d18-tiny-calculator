# Static deployment

Build the production files:

```bash
npm ci
npm run build
```

The static output is written to `dist/`. Copy that directory to any static file
host and serve `dist/index.html` with the generated `dist/assets/` directory
next to it. The Vite build uses relative asset paths, so the directory can be
served from a domain root or a subdirectory.

For a quick local check:

```bash
npm run preview
```
