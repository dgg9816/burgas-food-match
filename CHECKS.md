# Burgas Food Match Checks

Run this permanent regression list after every phase. Add checks for later phases; never remove earlier checks.

1. [ ] Page loads with no console errors.
2. [ ] Main action produces one result (sample in Phase 0; curated afterward).
3. [ ] Empty state appears when there is nothing to show.
4. [ ] Error state displays a readable sentence.
5. [ ] Busy state appears while working and clears afterward.
6. [ ] Status message appears and can be cleared.
7. [ ] Layout is usable at 375 px width.
8. [ ] No secret appears in any Git-tracked file.
9. [ ] `app.js` performs no rendering or DOM mutation.
10. [ ] Only `source.js` loads JSON or accesses local storage.
11. [ ] All configurable values are in `config.js`.
12. [ ] Restaurant data contains exactly five records and every required restaurant and dish key.
13. [ ] A profile can be saved, restored after refresh, and cleared.
14. [ ] Prepared location and radius filters change the result set and never exceed 20 km.
15. [ ] A known allergy conflict removes the affected dish.
16. [ ] Unknown allergen information produces a visible warning.
17. [ ] Dietary, cuisine, favorite-food, spice, and disliked-ingredient scoring is traceable to stored tags.
18. [ ] Missing price, rating, and opening hours render as unavailable.
19. [ ] Menu sources and last-checked dates appear on result cards.
20. [ ] Directions links target the intended restaurant and require no API key.
21. [ ] A restrictive profile can produce the readable no-results state without changing the saved profile.
