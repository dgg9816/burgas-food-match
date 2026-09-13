export const config = Object.freeze({
  projectName: "Burgas Food Match",
  sampleDataPath: "./data/sample.json",
  restaurantDataPath: "./data/restaurants.json",
  locationDataPath: "./data/locations.json",
  restaurantLimit: 5,
  maxRadiusKm: 20,
  profileStorageKey: "burgas-food-match-profile",
  geolocationTimeoutMs: 10000,
  sampleDelayMs: 450,
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
