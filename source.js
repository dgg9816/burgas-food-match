import { config } from "./config.js";

const profileKeys = Object.freeze([
  "allergies",
  "dietaryRules",
  "dislikedIngredients",
  "preferredCuisines",
  "spiceTolerance",
  "favoriteFoods"
]);

function wait(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

function isValidProfile(record) {
  if (!record || typeof record !== "object" || Array.isArray(record)) return false;
  if (!profileKeys.every((key) => Object.hasOwn(record, key))) return false;

  return profileKeys.every((key) => (
    key === "spiceTolerance"
      ? typeof record[key] === "string"
      : Array.isArray(record[key]) && record[key].every((value) => typeof value === "string")
  ));
}

async function loadSample() {
  const response = await fetch(config.sampleDataPath);
  if (!response.ok) throw new Error("The sample could not be loaded. Please try again.");

  const data = await response.json();
  if (!Array.isArray(data)) throw new Error("The sample data is not in the expected format.");
  return data;
}

export const source = Object.freeze({
  async load(params = {}) {
    await wait(config.sampleDelayMs);
    if (params.demoState === "empty") return [];
    if (params.demoState === "error") throw new Error("The preview error is working correctly. You can try the sample again.");
    return loadSample();
  },

  async detail(id) {
    const items = await loadSample();
    const item = items.find((entry) => entry.id === id);
    if (!item) throw new Error("That sample result could not be found.");
    return item;
  },

  async save(record) {
    if (!isValidProfile(record)) throw new Error("The food profile is not in the expected format.");
    localStorage.setItem(config.profileStorageKey, JSON.stringify(record));
    return record;
  },

  async list() {
    const stored = localStorage.getItem(config.profileStorageKey);
    if (!stored) return [];

    try {
      const profile = JSON.parse(stored);
      return isValidProfile(profile) ? [profile] : [];
    } catch {
      return [];
    }
  }
});
