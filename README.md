# Burgas Food Match

Burgas Food Match is a university project that will help people narrow down restaurant and dish choices around Burgas when they have dietary restrictions, allergies, or strong preferences.

## Current status

Phase 1 provides deterministic matching across exactly five researched Burgas restaurants. A user can save one browser-local food profile, choose a prepared location and radius, and see ranked dishes with reasons, uncertainty warnings, freshness dates, sources, approximate distance, and no-key directions.

## Run locally

The project uses browser ES modules and loads local JSON, so serve the folder over HTTP rather than opening `index.html` directly.

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Project boundaries

- Plain HTML, CSS, and browser JavaScript only
- No packages, framework, backend, database, API key, or secret
- No real restaurant data until Phase 1
- One browser-local food profile in later phases
- Free GitHub and Vercel deployment only

See `CONTRACTS.md` before changing protected interfaces and run every item in `CHECKS.md` after each phase.
