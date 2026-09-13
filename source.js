import { config } from "./config.js";

const profileKeys = Object.freeze(["allergies", "dietaryRules", "dislikedIngredients", "preferredCuisines", "spiceTolerance", "favoriteFoods"]);
const restaurantKeys = Object.freeze(["id", "name", "address", "latitude", "longitude", "cuisineTags", "priceLevel", "rating", "ratingSource", "openingHours", "directionsQuery", "sourceUrls", "lastChecked", "verificationNote", "dishes"]);
const dishKeys = Object.freeze(["id", "name", "description", "dietaryTags", "ingredientTags", "allergenTags", "unknownAllergens", "spiceLevel", "sourceUrl", "lastChecked"]);

function isValidProfile(record) {
  if (!record || typeof record !== "object" || Array.isArray(record)) return false;
  if (!profileKeys.every((key) => Object.hasOwn(record, key))) return false;
  return profileKeys.every((key) => key === "spiceTolerance" ? typeof record[key] === "string" : Array.isArray(record[key]) && record[key].every((value) => typeof value === "string"));
}

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error("The project data could not be loaded. Please try again.");
  const data = await response.json();
  if (!Array.isArray(data)) throw new Error("The project data is not in the expected format.");
  return data;
}

function validateRestaurants(restaurants) {
  if (restaurants.length !== config.restaurantLimit) throw new Error("Restaurant data must contain exactly five records.");
  restaurants.forEach((restaurant) => {
    if (!restaurantKeys.every((key) => Object.hasOwn(restaurant, key))) throw new Error("A restaurant record is missing required information.");
    if (!Number.isFinite(restaurant.latitude) || !Number.isFinite(restaurant.longitude)) throw new Error("A restaurant has invalid coordinates.");
    if (!restaurant.dishes.length || restaurant.dishes.some((dish) => !dishKeys.every((key) => Object.hasOwn(dish, key)))) throw new Error("A dish record is missing required information.");
  });
}

async function getRestaurants() {
  const restaurants = await loadJson(config.restaurantDataPath);
  validateRestaurants(restaurants);
  return restaurants;
}

function normalizeList(values) { return values.map((value) => value.trim().toLowerCase()).filter(Boolean); }
function wait(milliseconds) { return new Promise((resolve) => window.setTimeout(resolve, milliseconds)); }
function toRadians(degrees) { return degrees * Math.PI / 180; }
function distanceKm(from, to) {
  const latitudeDelta = toRadians(to.latitude - from.latitude);
  const longitudeDelta = toRadians(to.longitude - from.longitude);
  const startLatitude = toRadians(from.latitude);
  const endLatitude = toRadians(to.latitude);
  const haversine = Math.sin(latitudeDelta / 2) ** 2 + Math.cos(startLatitude) * Math.cos(endLatitude) * Math.sin(longitudeDelta / 2) ** 2;
  return config.distanceEarthRadiusKm * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}
function includesAny(sourceValues, wantedValues) { return wantedValues.some((wanted) => sourceValues.some((sourceValue) => sourceValue.includes(wanted) || wanted.includes(sourceValue))); }
function buildDirectionsUrl(destination) { return `${config.directionsBaseUrl}&destination=${encodeURIComponent(destination)}`; }

function scoreDish(restaurant, dish, profile) {
  const reasons = [];
  const warnings = [];
  let score = 0;
  if (profile.allergies.length && includesAny(dish.allergenTags, profile.allergies)) return null;
  if (dish.unknownAllergens) warnings.push(profile.allergies.length ? `Allergen information is incomplete for ${dish.name}.` : `Preparation or allergen details are incomplete for ${dish.name}.`);
  profile.dietaryRules.forEach((rule) => { if (dish.dietaryTags.includes(rule)) { score += config.scoring.dietaryMatch; reasons.push(`${dish.name} is tagged ${rule}.`); } });
  if (includesAny(dish.ingredientTags, profile.dislikedIngredients)) { score += config.scoring.dislikedIngredient; reasons.push(`${dish.name} includes an ingredient you dislike.`); }
  if (includesAny(restaurant.cuisineTags, profile.preferredCuisines)) { score += config.scoring.preferredCuisine; reasons.push(`${restaurant.name} matches a preferred cuisine.`); }
  if (includesAny([dish.name.toLowerCase(), ...dish.ingredientTags], profile.favoriteFoods)) { score += config.scoring.favoriteFood; reasons.push(`${dish.name} matches a favorite food.`); }
  if (profile.spiceTolerance !== "unknown" && dish.spiceLevel === profile.spiceTolerance) { score += config.scoring.spiceMatch; reasons.push(`${dish.name} matches your spice preference.`); }
  if (!reasons.length) reasons.push(`${dish.name} has no known conflict in the recorded data.`);
  return { dish, score, reasons, warnings };
}

export const source = Object.freeze({
  async locations() { return loadJson(config.locationDataPath); },
  async load(params = {}) {
    await wait(config.sampleDelayMs);
    const restaurants = await getRestaurants();
    const locations = await loadJson(config.locationDataPath);
    const location = locations.find((item) => item.id === params.locationId);
    const radiusKm = Number(params.radiusKm);
    if (!isValidProfile(params.profile)) throw new Error("Complete a valid food profile before searching.");
    if (!location || !Number.isFinite(location.latitude) || !Number.isFinite(location.longitude)) throw new Error("Choose a valid Burgas starting point.");
    if (!Number.isFinite(radiusKm) || radiusKm <= 0 || radiusKm > config.maxRadiusKm) throw new Error("Choose a search radius up to 20 km.");
    const profile = Object.fromEntries(profileKeys.map((key) => [key, key === "spiceTolerance" ? params.profile[key] : normalizeList(params.profile[key])]));
    return restaurants.map((restaurant) => {
      const approximateDistance = distanceKm(location, restaurant);
      if (approximateDistance > radiusKm) return null;
      const eligible = restaurant.dishes
        .map((dish) => scoreDish(restaurant, dish, profile))
        .filter((entry) => entry && entry.score >= config.minimumMatchScore)
        .sort((a, b) => b.score - a.score);
      if (!eligible.length) return null;
      return { id: restaurant.id, name: restaurant.name, address: restaurant.address, distanceKm: Number(approximateDistance.toFixed(config.distanceDecimals)), priceLevel: restaurant.priceLevel, rating: restaurant.rating, ratingSource: restaurant.ratingSource, openingHours: restaurant.openingHours, lastChecked: restaurant.lastChecked, matchScore: eligible[0].score, matchReasons: [...new Set(eligible.flatMap((entry) => entry.reasons))], warnings: [...new Set(eligible.flatMap((entry) => entry.warnings))], directionsUrl: buildDirectionsUrl(restaurant.directionsQuery), verificationNote: restaurant.verificationNote, dishes: eligible.slice(0, 3).map((entry) => entry.dish) };
    }).filter(Boolean).sort((a, b) => b.matchScore - a.matchScore || a.distanceKm - b.distanceKm);
  },
  async detail(id) { const item = (await getRestaurants()).find((entry) => entry.id === id); if (!item) throw new Error("That restaurant could not be found."); return item; },
  async save(record) { if (record === null) { localStorage.removeItem(config.profileStorageKey); return null; } if (!isValidProfile(record)) throw new Error("The food profile is not in the expected format."); localStorage.setItem(config.profileStorageKey, JSON.stringify(record)); return record; },
  async list() { const stored = localStorage.getItem(config.profileStorageKey); if (!stored) return []; try { const profile = JSON.parse(stored); return isValidProfile(profile) ? [profile] : []; } catch { return []; } }
});
