# Burgas Food Match - Project Guideline

## Project Status

This is the final product guideline for a personal university school project built with Codex, GitHub, and Vercel.

- **Project name:** Burgas Food Match
- **Project category:** Category 1 - curated data
- **Target build time:** Roughly two hours if restaurant research is completed efficiently
- **MVP location:** Burgas, Bulgaria
- **MVP data size:** Exactly ten restaurants
- **Cost:** $0; no billing account, payment card, paid API, or paid trial

Codex must read this file and `TechnicalGuideline.md` before starting or continuing any phase.

## 1. MVP Pitch

> Burgas Food Match helps people with dietary restrictions, allergies, or strong food dislikes quickly find promising places to eat in Burgas. Users create a food profile, choose a location and search radius, and receive ranked restaurant and dish suggestions with explanations, approximate distance, price, rating, opening hours, uncertainty warnings, and directions.

The website is a school demonstration. It helps users narrow their choices but does not guarantee that a dish or restaurant is medically safe.

## 2. Job-to-be-Done Statement

> When I am choosing where to eat while managing dietary restrictions or strong food dislikes, I want to quickly identify nearby restaurants and dishes that fit my needs, so I can enjoy eating out with less uncertainty and without checking every menu or calling every restaurant.

- **Functional job:** Find a suitable restaurant and dish.
- **Emotional job:** Feel confident and less tired or frustrated.
- **Social job:** Join other people for a meal without making the decision unnecessarily difficult.

## 3. Target Users

The MVP is for people living in or visiting Burgas who have one or more of the following:

- food allergies or medical ingredient restrictions;
- vegetarian, vegan, halal, or another supported dietary rule;
- ingredients they strongly dislike;
- preferred cuisines;
- a preferred spice level;
- favorite foods.

The interface must clearly distinguish medical restrictions from preferences.

## 4. Approved MVP Inclusions

- Exactly ten manually researched Burgas restaurants.
- A project-local restaurant and dish dataset.
- Allergies, dietary rules, disliked ingredients, preferred cuisines, spice tolerance, and favorite foods.
- Exclusion of a dish when the data contains a known conflict with a selected allergy.
- A warning when allergen, ingredient, or preparation information is missing or uncertain.
- Transparent deterministic match ranking without AI.
- An explanation of why each recommendation matches.
- A prepared manual Burgas location or optional current location.
- Search radius up to 20 km.
- Approximate straight-line distance.
- Manually checked price, rating, and opening hours where available.
- Source and last-checked information.
- External Google Maps directions links requiring no API key.
- One food profile saved in the current browser.
- Responsive phone and laptop presentation.
- Clear loading, empty, permission-denied, and error states.

## 5. Required User Experience

### Food profile

The user can enter:

- allergies;
- dietary rules;
- disliked ingredients;
- preferred cuisines;
- spice tolerance;
- favorite foods.

The user can save one profile on the current device and clear it later. The interface must explain that the profile is not an online account and does not transfer between devices.

### Location and radius

The user can:

- choose one prepared Burgas area or landmark;
- optionally select **Use My Current Location** in Phase 2;
- choose a search radius no greater than 20 km;
- continue with manual selection if location permission is denied.

### Recommendation cards

Each card shows:

- restaurant name;
- potentially suitable dishes;
- why the result matches;
- approximate distance;
- approximate price level;
- recorded rating and source;
- recorded opening hours;
- last-checked date;
- verification or uncertainty note;
- relevant allergy warning;
- **Get Directions** as the primary action.

If no results match, the website must explain that the selected requirements may be too restrictive. It must not change the user's profile automatically.

### Required safety message

> Restaurant menus and preparation methods can change. If you have an allergy or medical restriction, contact the restaurant before ordering. This project suggests possible matches and does not guarantee safety.

## 6. Matching Rules

Apply the following order:

1. Calculate approximate distance from the selected location.
2. Remove restaurants outside the selected radius.
3. Exclude a dish when a known allergen conflicts with a selected allergy.
4. Treat missing allergen information as unknown, never as safe.
5. Reward dishes matching required dietary rules.
6. Penalize disliked ingredients.
7. Reward preferred cuisines, suitable spice level, and favorite foods.
8. Rank restaurants using their best eligible dishes.
9. Display the reasons and warnings used in the result.

The score measures profile compatibility, not medical safety. Codex must not invent ingredients, allergens, restaurant details, or match evidence.

## 7. Restaurant Data Requirement

Restaurant research and verification is the first product task inside Phase 1.

Exactly ten restaurant records must be prepared. Together they must demonstrate:

- more than one cuisine;
- at least one dietary-rule match;
- at least one known allergen conflict;
- at least one unknown-allergen warning;
- disliked-ingredient ranking;
- different distances, prices, ratings, or opening hours where available;
- a no-results case for a restrictive profile.

Every restaurant requires a stable ID, name, address, verified coordinates, at least one dish, a directions query, source information, last-checked date, and uncertainty note. Price, rating, and hours may be used only when manually checked. Missing values stay missing.

Do not scrape menus or reviews. Do not copy long reviews or menu descriptions. Retain a public source URL for every researched record.

## 8. Build Rules Shared by All Phases

Before changing files, Codex must:

1. Read `ProjectGuideline.md`, `TechnicalGuideline.md`, `CONTRACTS.md`, and `CHECKS.md` when those files exist.
2. State the requested phase.
3. List the smallest expected file changes.
4. Identify whether the request would alter a protected contract.
5. Stop and ask before changing a protected contract.
6. Preserve everything that passed in earlier phases.

During a phase, Codex must:

- implement only that phase;
- work additively rather than reorganizing working code;
- keep all tunable values in `config.js`;
- keep data access inside `source.js`;
- keep visible-state rendering inside `ui.js`;
- add no package or external technology without approval;
- use no paid service;
- mark uncertainty instead of guessing.

At the end of a phase, Codex must:

1. Run the complete `CHECKS.md` list.
2. Add new checks required by the phase without removing old checks.
3. Report every check as pass or fail.
4. Report files changed, dependencies added, and unresolved issues.
5. Create the requested Git checkpoint only after checks pass.
6. Push and verify the public Vercel deployment when the phase requires it.
7. Stop and wait for approval before the next phase.

## 9. PHASE 0 - Stable Foundation and Deployment Smoke Test

### Goal

Create an empty but well-shaped project whose stable seams and visible states are proven before product features are built.

### Required work

- Read both final guideline files.
- Create `.gitignore` first.
- Create the exact foundation structure specified in `TechnicalGuideline.md`.
- Create `CONTRACTS.md`, `CHECKS.md`, and `README.md`.
- Implement the required `ui.js` and `source.js` interfaces with sample data only.
- Show the busy, status, result, empty, and readable error states at least once.
- Use no real restaurant data and build no product feature.
- Deploy the foundation through GitHub and Vercel.

### Acceptance criteria

1. The exact foundation files exist.
2. The page loads locally without console errors.
3. The sample action renders one result.
4. Busy, status, empty, and error states are visibly tested.
5. The page works at 375 px width.
6. `CONTRACTS.md` records protected names and shapes.
7. `CHECKS.md` can be completed manually in under three minutes.
8. No package, real restaurant data, API, backend, key, or payment setup exists.
9. A Git checkpoint is created and pushed.
10. The public Vercel page loads.

### Suggested checkpoint

`Phase 0 - foundation`

### STOP GATE

Do not start Phase 1 until all acceptance criteria pass and the public foundation is visible.

## 10. PHASE 1 - Ten Restaurants, Food Profile, and Recommendations

### Goal

Replace the sample-only behavior inside the stable foundation with the useful curated-data product.

### Required work

- Research and verify exactly ten Burgas restaurants.
- Replace sample data with final-shape curated restaurant data.
- Build the complete food-profile controls.
- Save and clear one profile through the permanent `source.save()` and `source.list()` methods.
- Add prepared manual Burgas locations.
- Add radius filtering up to 20 km.
- Calculate approximate straight-line distance.
- Apply the matching and allergy rules.
- Display ranked cards, match reasons, sources, last-checked dates, and warnings.
- Add no-key external directions links.
- Preserve every Phase 0 contract and check.

### Acceptance criteria

1. Exactly ten sourced restaurants are present.
2. All restaurant and dish records follow `CONTRACTS.md` without omitted keys.
3. The food profile can be entered, saved, restored after refresh, and cleared.
4. Prepared manual location and radius filtering work.
5. Known allergy conflicts are excluded at dish level.
6. Unknown allergy information produces a visible warning.
7. Match reasons are visible and traceable to stored data.
8. Missing price, rating, or hours are labeled unavailable.
9. Sources and last-checked dates display.
10. Directions open the intended restaurant.
11. Empty and error states remain readable.
12. All Phase 0 checks still pass.
13. The local and public versions pass.
14. No paid service, secret, API key, authentication, or database exists.

### Suggested checkpoint

`Phase 1 - curated restaurant matching`

### STOP GATE

Report files, checks, and limitations, then stop before Phase 2.

## 11. PHASE 2 - Current Location and Reliability Polish

### Goal

Add optional current-location distance and finish the public school demonstration without adding new external technology.

### Required work

- Add **Use My Current Location**.
- Request location only after the user presses the control.
- Explain the permission request.
- Calculate distance from current coordinates.
- Do not save precise current coordinates.
- Preserve prepared manual-location fallback.
- Handle permission denied, unavailable, and timeout states.
- Improve phone and laptop layout, accessibility, focus, and disabled states.
- Retest all profile, matching, warning, radius, and directions behavior.

### Acceptance criteria

1. Granting location permission updates approximate distances.
2. Denying permission produces a readable message and preserves manual selection.
3. Exact current location is not stored.
4. Radius filtering, matching, warnings, and directions still work.
5. Busy, empty, and error states still work.
6. The layout is usable at 375 px and a normal laptop width.
7. Every prior `CHECKS.md` item still passes.
8. The public Vercel site passes the complete test list.
9. The project remains completely free.

### Suggested checkpoint

`Phase 2 - current location and reliability polish`

### STOP GATE

Stop when the complete public MVP passes. Do not add later features.

## 12. Explicit Exclusions

Do not add:

- Maps or Places APIs;
- address autocomplete or geocoding APIs;
- live menu scraping;
- review scraping;
- Firecrawl or another scraping provider;
- reservations, ordering, delivery, or payments;
- authentication, user accounts, or passwords;
- database or cloud storage;
- React, Next.js, Vue, Svelte, or another framework;
- CSS framework, bundler, linter, test runner, UI library, or state library;
- OpenAI or another AI/LLM API;
- chatbot, agents, embeddings, vector database, or RAG;
- analytics, Docker, custom CI/CD, or paid domain;
- any package unless the student explicitly approves a demonstrated need.

If an excluded component appears necessary, Codex must stop and explain why rather than add it.

## 13. Definition of Done

A person can open the public site, create a food profile, choose a prepared or current Burgas location, select a radius up to 20 km, receive transparent suggestions from exactly ten restaurants, see honest warnings and data freshness, and open directions. The site works on a phone and laptop, has no secret or paid dependency, and is simple enough for the student to explain.
