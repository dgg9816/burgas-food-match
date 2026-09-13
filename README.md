# Burgas Food Match

Burgas Food Match is a university project that will help people narrow down restaurant and dish choices around Burgas when they have dietary restrictions, allergies, or strong preferences.

## Current status

The enhanced MVP combines the completed Phase 1 and Phase 2 work. A user can build a profile with quick-select chips or typed details, save it in the browser, choose a prepared Burgas location or temporarily use current location, set a radius, and see deterministic recommendations from exactly ten researched restaurants. Results lead with the top three, show preference-match percentages, and retain reasons, uncertainty warnings, freshness dates, sources, approximate distance, and no-key directions. Precise current coordinates are used only in memory and are never saved.

## Run locally

The project uses browser ES modules and loads local JSON, so serve the folder over HTTP rather than opening `index.html` directly.

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Project boundaries

- Plain HTML, CSS, and browser JavaScript only
- No packages, framework, backend, database, API key, or secret
- Ten curated restaurant records with traceable public sources
- One browser-local food profile
- Free GitHub and Vercel deployment only

See `CONTRACTS.md` before changing protected interfaces and run every item in `CHECKS.md` after each phase.
