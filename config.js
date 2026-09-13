export const config = Object.freeze({
  projectName: "Burgas Food Match",
  sampleDataPath: "./data/sample.json",
  restaurantDataPath: "./data/restaurants.json",
  locationDataPath: "./data/locations.json",
  restaurantLimit: 10,
  maxRadiusKm: 20,
  profileStorageKey: "burgas-food-match-profile",
  geolocationTimeoutMs: 10000,
  geolocationMaximumAgeMs: 300000,
  geolocationEnableHighAccuracy: false,
  sampleDelayMs: 450,
  distanceEarthRadiusKm: 6371,
  distanceDecimals: 1,
  defaultRadiusKm: 5,
  minimumMatchScore: 0,
  topMatchCount: 3,
  matchPercentMaximum: 100,
  directionsBaseUrl: "https://www.google.com/maps/dir/?api=1",
  featureFlags: Object.freeze({
    curatedRecommendations: true,
    currentLocation: true
  }),
  scoring: Object.freeze({
    dietaryMatch: 40,
    preferredCuisine: 20,
    favoriteFood: 15,
    spiceMatch: 10,
    dislikedIngredient: -30
  }),
  profileChoices: Object.freeze({
    allergies: Object.freeze(["milk", "gluten", "egg", "fish", "soy", "sesame", "shellfish", "nuts"]),
    dietaryRules: Object.freeze(["vegetarian", "vegan"]),
    dislikedIngredients: Object.freeze(["tomato", "mushrooms", "onion", "cheese", "salmon", "shrimp"]),
    preferredCuisines: Object.freeze(["italian", "mediterranean", "asian", "sushi", "seafood", "european", "fusion", "grill"]),
    spiceTolerance: Object.freeze(["mild", "medium", "hot"]),
    favoriteFoods: Object.freeze(["pizza", "burger", "salad", "pasta", "sushi", "fish"])
  })
});
