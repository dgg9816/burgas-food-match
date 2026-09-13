# Burgas Food Match Contracts

These contracts establish the stable seams created in Phase 0. Required object keys are never omitted. Missing values use `""`, `null`, `false`, or `[]` as specified.

## DO NOT CHANGE WITHOUT ASKING

Do not rename, remove, or change the shape of anything listed below without explicit approval. Later phases may add protected items while preserving these.

## UI exports

`ui.js` exports:

- `setBusy(isBusy)`
- `setStatus(message)`
- `showError(message)`
- `showEmpty(message)`
- `renderList(items)`
- `clearResults()`
- `renderLocations(locations)`
- `renderProfileChoices(choices)`
- `toggleProfileChoice(choice)`
- `syncProfileChoices()`
- `setResultExpansion(isExpanded)`
- `fillProfile(profile)`
- `clearProfileFields()`
- `setProfileMessage(message)`
- `setRadiusValue(radiusKm)`
- `setLocationBusy(isBusy)`
- `setLocationMessage(message, kind)`
- `setCurrentLocationActive(isActive)`

## Source interface

`source.js` exports an object named `source` with async methods:

- `source.load(params)`
- `source.detail(id)`
- `source.save(record)`
- `source.list()`
- `source.locations()`
- `source.currentLocation()`

## Configuration property names

The frozen configuration object protects these names: `projectName`, `sampleDataPath`, `restaurantDataPath`, `locationDataPath`, `restaurantLimit`, `maxRadiusKm`, `profileStorageKey`, `geolocationTimeoutMs`, `geolocationMaximumAgeMs`, `geolocationEnableHighAccuracy`, `sampleDelayMs`, `distanceEarthRadiusKm`, `distanceDecimals`, `defaultRadiusKm`, `minimumMatchScore`, `topMatchCount`, `matchPercentMaximum`, `directionsBaseUrl`, `profileChoices.allergies`, `profileChoices.dietaryRules`, `profileChoices.dislikedIngredients`, `profileChoices.preferredCuisines`, `profileChoices.spiceTolerance`, `profileChoices.favoriteFoods`, `featureFlags.curatedRecommendations`, `featureFlags.currentLocation`, `scoring.dietaryMatch`, `scoring.preferredCuisine`, `scoring.favoriteFood`, `scoring.spiceMatch`, and `scoring.dislikedIngredient`.

## Stable DOM IDs

- `app-header`
- `controls`
- `main-action`
- `working-indicator`
- `status`
- `results`
- `profile-form`
- `allergies`
- `dietary-rules`
- `disliked-ingredients`
- `preferred-cuisines`
- `spice-tolerance`
- `favorite-foods`
- `save-profile`
- `clear-profile`
- `profile-message`
- `manual-location`
- `radius-km`
- `find-matches`
- `safety-note`
- `use-current-location`
- `location-message`
- `allergy-choices`
- `dietary-choices`
- `disliked-choices`
- `cuisine-choices`
- `spice-choices`
- `favorite-choices`
- `show-all-matches`

## Food profile

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

## Curated dish

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

## Curated restaurant

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
  imageUrl: "",
  imageAlt: "",
  imageSourceUrl: "",
  dishes: []
}
```

## Prepared location

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

## Rendered result

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
  imageUrl: "",
  imageAlt: "",
  imageSourceUrl: "",
  dishes: []
}
```
