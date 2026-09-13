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
12. [ ] Restaurant data contains exactly ten records and every required restaurant and dish key.
13. [ ] A profile can be saved, restored after refresh, and cleared.
14. [ ] Prepared location and radius filters change the result set and never exceed 20 km.
15. [ ] A known allergy conflict removes the affected dish.
16. [ ] Unknown allergen information produces a visible warning.
17. [ ] Dietary, cuisine, favorite-food, spice, and disliked-ingredient scoring is traceable to stored tags.
18. [ ] Missing price, rating, and opening hours render as unavailable.
19. [ ] Menu sources and last-checked dates appear on result cards.
20. [ ] Directions links target the intended restaurant and require no API key.
21. [ ] A restrictive profile can produce the readable no-results state without changing the saved profile.
22. [ ] Current location is requested only after `Use My Current Location` is pressed.
23. [ ] Granting location permission updates approximate distances and clearly marks current-location mode.
24. [ ] Denied location permission shows a readable fallback message and preserves the prepared selection.
25. [ ] Unsupported, unavailable, and timed-out location attempts show readable messages.
26. [ ] Precise current coordinates are never written to local storage.
27. [ ] Choosing a prepared location exits current-location mode without changing the saved profile.
28. [ ] The complete flow remains usable at 375 px and a normal laptop width.
29. [ ] Profile suggestion chips update the existing fields, restore with the saved profile, and clear with it.
30. [ ] Match percentages are deterministic, stay between 0 and 100, and are labeled as preference compatibility rather than safety.
31. [ ] Exactly one first result is visually identified as the best match.
32. [ ] Only the top three results are initially visible when more matches exist.
33. [ ] The view-all control reveals every result and can return to the top three.
34. [ ] Ratings identify their source when a rating is available.
35. [ ] The burgundy-and-cream identity, custom mark, controls, and result cards remain usable at phone and laptop widths.
