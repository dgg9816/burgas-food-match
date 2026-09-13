# Burgas Food Match - Technical Guideline

## 1. Purpose and Authority

This file defines the technical contracts and guardrails for Burgas Food Match. It complements `ProjectGuideline.md`, which defines the product and three build phases.

The attached notes used to prepare this file were reference material. This guideline includes only the parts relevant to a Category 1 curated-data project.

Codex must read both guideline files before changing the project. When `CONTRACTS.md` and `CHECKS.md` exist, Codex must read those too.

## 2. Fixed Stack

Use only:

- HTML;
- CSS;
- plain browser JavaScript using ES modules;
- project-local JSON;
- browser local storage;
- browser Geolocation API in Phase 2;
- a small JavaScript Haversine function;
- Google Maps directions URLs requiring no API key;
- Git and GitHub;
- Vercel Hobby plan.

Do not install a frontend framework, CSS framework, bundler, linter, test runner, UI library, state library, or package during Phase 0. No package is expected later.

There is no backend, database, API key, environment variable, or secret in the MVP.

## 3. Cost Rule

The project must cost $0. Do not create a billing account, add a payment card, start a paid trial, buy a domain, or enable a metered service that can charge money.

If any setup requests payment information, stop and report the exact step. Do not continue or substitute a service without approval.

## 4. Exact Foundation Structure

Phase 0 must create exactly this starting structure:

```text
project-root/
  index.html
  style.css
  app.js
  ui.js
  source.js
  config.js
  data/
    sample.json
  CONTRACTS.md
  CHECKS.md
  README.md
  .gitignore
```

Create `.gitignore` first with:

```text
.env
.env.local
node_modules
.DS_Store
```

Phase 1 may add `data/restaurants.json` and `data/locations.json`. Do not reorganize the foundation.

## 5. Responsibility Boundaries

### `index.html`

Contains semantic markup and the ES-module script reference. It must not contain application JavaScript or large inline styles.

### `style.css`

Contains all visual styling. Define color, spacing, typography, and radius values as CSS custom properties in `:root`. Include disabled, status, warning, error, empty, card, and mobile states. Use no animation in Phase 0.

### `app.js`

Wiring only:

- registers user actions;
- reads input values;
- builds plain parameter objects;
- calls `source` methods;
- calls exported `ui.js` functions.

It may read form-control values and register listeners, but it must never render results or mutate `innerHTML`, `textContent`, `classList`, or styles.

### `ui.js`

The only place that creates or changes visible state. All rendering and DOM mutation belong here.

### `source.js`

The only place data enters or is persisted. It loads JSON, saves/reads the local food profile, applies project data rules, and returns plain objects matching `CONTRACTS.md`.

No other file fetches JSON or accesses local storage.

### `config.js`

Exports one frozen object containing every value a human might tune. No tunable URL, limit, radius, scoring weight, storage key, timeout, or data path may be hard-coded elsewhere.

### `CONTRACTS.md`

Records protected data shapes, DOM IDs, UI function names, and source method names. It must contain a heading named **DO NOT CHANGE WITHOUT ASKING**.

### `CHECKS.md`

Contains the permanent manual regression list. Run it after every phase. Add checks; never remove checks.

## 6. Permanent UI Interface

`ui.js` must export and implement these exact functions in Phase 0:

```js
setBusy(isBusy)
setStatus(message)
showError(message)
showEmpty(message)
renderList(items)
clearResults()
renderProfileChoices(choices)
toggleProfileChoice(choice)
setResultExpansion(isExpanded)
```

Behavior:

- `setBusy` disables the primary action and shows or hides a working indicator.
- `setStatus` displays a plain sentence above results; an empty string clears it.
- `showError` shows a readable user-facing sentence, never a stack trace or raw response.
- `showEmpty` displays a successful-but-empty state.
- `renderList` renders normalized result objects.
- `clearResults` empties the result area.

Every state must be visible and manually tested during Phase 0 using sample data or a forced error.

## 7. Permanent Source Interface

`source.js` must export an object named `source` with these async methods:

```js
source.load(params)
source.detail(id)
source.save(record)
source.list()
```

Project-specific meanings:

- `source.load(params)` returns normalized, ranked restaurant results. In Phase 0 it returns `data/sample.json`; in Phase 1 it uses curated data.
- `source.detail(id)` returns one normalized restaurant or throws a readable not-found error.
- `source.save(record)` validates and saves the single food profile to local storage.
- `source.list()` returns `[savedProfile]` or `[]`.

These names are permanent. Later phases change the inside of the methods, not the calling interface.

## 8. Configuration Contract

`config.js` exports one frozen object. By the end of Phase 2 it contains at least:

```js
export const config = Object.freeze({
  projectName: "Burgas Food Match",
  sampleDataPath: "./data/sample.json",
  restaurantDataPath: "./data/restaurants.json",
  locationDataPath: "./data/locations.json",
  restaurantLimit: 10,
  maxRadiusKm: 20,
  profileStorageKey: "burgas-food-match-profile",
  geolocationTimeoutMs: 10000,
  topMatchCount: 3,
  matchPercentMaximum: 100,
  directionsBaseUrl: "https://www.google.com/maps/dir/?api=1",
  featureFlags: Object.freeze({
    curatedRecommendations: false,
    currentLocation: false
  }),
  scoring: Object.freeze({
    dietaryMatch: 40,
    preferredCuisine: 20,
    favoriteFood: 15,
    spiceMatch: 10,
    dislikedIngredient: -30
  })
});
```

Values may be refined before Phase 1, but only in `config.js`. The protected property names must be documented in `CONTRACTS.md`.

## 9. Data Contracts

No required key may be omitted. Use `""`, `null`, `false`, or `[]` for missing values as defined below.

### Food profile

```js
{
  allergies: [],
  dietaryRules: [],
  dislikedIngredients: [],
  preferredCuisines: [],
  spiceTolerance: "unknown",
  favoriteFoods: []
}
```

### Curated dish

```js
{
  id: "",
  name: "",
  description: "",
  dietaryTags: [],
  ingredientTags: [],
  allergenTags: [],
  unknownAllergens: true,
  spiceLevel: "unknown",
  sourceUrl: "",
  lastChecked: ""
}
```

### Curated restaurant

```js
{
  id: "",
  name: "",
  address: "",
  latitude: null,
  longitude: null,
  cuisineTags: [],
  priceLevel: null,
  rating: null,
  ratingSource: "",
  openingHours: [],
  directionsQuery: "",
  sourceUrls: [],
  lastChecked: "",
  verificationNote: "",
  dishes: []
}
```

### Prepared location

```js
{
  id: "",
  label: "",
  latitude: null,
  longitude: null,
  sourceUrl: "",
  lastChecked: ""
}
```

### Rendered result

```js
{
  id: "",
  name: "",
  address: "",
  distanceKm: null,
  priceLevel: null,
  rating: null,
  ratingSource: "",
  openingHours: [],
  lastChecked: "",
  matchScore: 0,
  matchPercent: 0,
  matchReasons: [],
  warnings: [],
  directionsUrl: "",
  verificationNote: "",
  dishes: []
}
```

`CONTRACTS.md` must reproduce the final approved shapes and state that keys are never omitted.

## 10. Stable DOM IDs

Phase 0 must establish:

- `app-header`
- `controls`
- `main-action`
- `working-indicator`
- `status`
- `results`

Phase 1 may add and then protect:

- `profile-form`
- `allergies`
- `dietary-rules`
- `disliked-ingredients`
- `preferred-cuisines`
- `spice-tolerance`
- `favorite-foods`
- `save-profile`
- `clear-profile`
- `manual-location`
- `radius-km`
- `find-matches`
- `safety-note`

Phase 2 may add and then protect:

- `use-current-location`
- `location-message`

The enhanced MVP may add and then protect:

- `allergy-choices`
- `dietary-choices`
- `disliked-choices`
- `cuisine-choices`
- `spice-choices`
- `favorite-choices`
- `show-all-matches`

Every ID JavaScript depends on must be listed in `CONTRACTS.md`. Existing protected IDs may not be renamed or removed without asking.

## 11. Matching and Safety Rules

Matching must be deterministic and testable.

```text
validate profile and location
  -> calculate restaurant distance
  -> remove results outside radius
  -> evaluate each dish
  -> exclude known allergy conflicts
  -> warn about unknown allergens
  -> score dietary and preference matches
  -> create reasons and warnings
  -> rank normalized restaurant results
```

Rules:

- Known allergen conflict excludes the affected dish.
- Unknown allergen information produces a warning.
- Unknown never means safe.
- Disliked ingredients lower ranking but are not medical exclusions.
- Missing price, rating, and hours stay missing.
- Matching reasons must be supported by stored tags.
- No generated or inferred food-safety claim is allowed.

Allowed labels include **Potential match**, **Information incomplete**, and **Last checked [date]**.

Forbidden labels include **Safe for you**, **Allergy-safe**, and **Guaranteed allergen-free**.

## 12. Distance, Location, and Directions

- Use verified coordinates for restaurants and prepared locations.
- Use a small Haversine function for approximate straight-line distance.
- Enforce the 20 km maximum from `config.js`.
- Label distance as approximate.
- Request current location only after the Phase 2 button is pressed.
- Do not save precise current coordinates.
- Preserve manual selection if permission is denied or location fails.
- Use `encodeURIComponent` when building the directions destination.
- Open directions in a new tab with `rel="noopener noreferrer"`.

Directions format:

```text
https://www.google.com/maps/dir/?api=1&destination=ENCODED_DESTINATION
```

Do not embed a map or add a mapping SDK.

## 13. Local Storage

Local storage may contain one validated food profile and harmless interface preferences only.

It must not contain:

- passwords or tokens;
- precise current-location coordinates;
- restaurant data;
- hidden analytics identifiers.

Malformed or outdated saved data must be ignored safely. The user must have a visible clear-profile action.

## 14. Required Phase 0 Regression List

`CHECKS.md` must begin with a numbered checklist that can be completed manually in under three minutes:

1. Page loads with no console errors.
2. Main action produces a sample result.
3. Empty state appears when there is nothing to show.
4. Error state displays a readable sentence.
5. Busy state appears while working and clears afterward.
6. Status message appears and can be cleared.
7. Layout is usable at 375 px width.
8. No secret appears in any Git-tracked file.
9. `app.js` performs no rendering or DOM mutation.
10. Only `source.js` loads JSON or accesses local storage.
11. All configurable values are in `config.js`.

Phase 1 must add checks for ten-record validation, profile persistence, matching, known conflicts, unknown warnings, radius, sources, freshness, and directions.

Phase 2 must add checks for location granted, denied, unavailable, timeout, non-persistence of coordinates, and responsive regression.

Never remove an earlier check.

## 15. Error Handling

The site must never fail into a blank page. Handle:

- malformed or missing JSON;
- record count other than exactly ten in Phase 1;
- missing required keys;
- invalid coordinates;
- malformed saved profile;
- no matching restaurants;
- all dishes excluded by known conflicts;
- missing price, rating, hours, or source;
- geolocation unsupported, denied, unavailable, or timed out;
- directions URL construction failure.

Show a short user-facing message. Technical details may go to the console during local development but must not reveal personal data.

## 16. Styling Rules

- Modern and playful, not clinical.
- Use CSS custom properties for colors, spacing, typography, and corner radii.
- Maintain readable contrast and visible keyboard focus.
- Provide button hover, focus, and disabled states.
- Keep warnings prominent but calm.
- Include one mobile breakpoint beginning in Phase 0.
- Keep Phase 0 CSS under roughly 120 lines; expand only for phase requirements.
- Avoid heavy animation and decorative complexity.

## 17. Explicit Technical Exclusions

Do not add:

- React, Next.js, Vue, Svelte, or another framework;
- CSS framework, bundler, linter, test runner, UI library, or state library;
- backend or serverless route;
- authentication or database;
- Google Maps API, Google Places API, Mapbox API, or geocoding API;
- Firecrawl, live menu scraping, or review scraping;
- OpenAI or another LLM API;
- chatbot, agents, embeddings, vector database, or RAG;
- reservation, ordering, delivery, or payment integration;
- analytics stack;
- Docker or custom CI/CD;
- purchased domain or paid Vercel feature.

If a requirement appears to need one of these, stop and explain rather than adding it.

## 18. Git, Deployment, and Permissions

After each phase:

1. Run all regression checks.
2. Commit only after required checks pass.
3. Push to GitHub.
4. Wait for Vercel redeployment.
5. Test the public URL.
6. Stop at the phase gate.

Use least privilege:

| Permission | Preferred scope |
|---|---|
| Project-folder editing | Current task or conversation |
| Localhost browser | Once |
| Browser geolocation | User decides during Phase 2 testing |
| Git metadata | Current task or conversation |
| GitHub/Vercel browser control | Current supervised conversation |
| Screen/accessibility | Only when required |

Do not purchase a domain, start a trial, or add payment details. Use the free `vercel.app` address.

## 19. Guard Prompt for Every Phase

Use this instruction before every phase:

> Before changing anything, read `ProjectGuideline.md`, `TechnicalGuideline.md`, `CONTRACTS.md`, and `CHECKS.md`. Tell me which phase I requested and list the smallest files you expect to change. Tell me whether the request changes anything under **DO NOT CHANGE WITHOUT ASKING**; if it does, stop and explain. Implement only this phase, additively. Keep data access in `source.js`, visible states in `ui.js`, and tunable values in `config.js`. When finished, run every check, add new phase checks without removing old ones, report pass/fail results, files changed, dependencies added, and unresolved items, then stop.

## 20. Failure Recovery

Use:

**observe -> reproduce -> change one thing -> retest**

Do not redesign the project to fix one bug. Restore the last working Git checkpoint if necessary. Reduce decorative polish before reducing the core learning objective. Never solve a time problem by adding a paid service.
