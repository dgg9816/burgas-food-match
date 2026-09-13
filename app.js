import { config } from "./config.js";
import { source } from "./source.js";
import { clearProfileFields, clearResults, fillProfile, renderList, renderLocations, renderProfileChoices, setBusy, setCurrentLocationActive, setLocationBusy, setLocationMessage, setProfileMessage, setRadiusValue, setResultExpansion, setStatus, showEmpty, showError, toggleProfileChoice } from "./ui.js";

const profileForm = document.querySelector("#profile-form");
const clearProfileAction = document.querySelector("#clear-profile");
const findAction = document.querySelector("#find-matches");
const currentLocationAction = document.querySelector("#use-current-location");
const manualLocation = document.querySelector("#manual-location");
const showAllAction = document.querySelector("#show-all-matches");
let currentLocation = null;
function splitValues(value) { return value.split(",").map((item) => item.trim()).filter(Boolean); }
function readProfile() {
  return {
    allergies: splitValues(document.querySelector("#allergies").value),
    dietaryRules: splitValues(document.querySelector("#dietary-rules").value),
    dislikedIngredients: splitValues(document.querySelector("#disliked-ingredients").value),
    preferredCuisines: splitValues(document.querySelector("#preferred-cuisines").value),
    spiceTolerance: document.querySelector("#spice-tolerance").value,
    favoriteFoods: splitValues(document.querySelector("#favorite-foods").value)
  };
}
async function findMatches() {
  setBusy(true); setStatus(`Comparing your profile with ${config.restaurantLimit} researched restaurants…`); clearResults();
  try {
    const items = await source.load({ profile: readProfile(), locationId: manualLocation.value, currentLocation, radiusKm: document.querySelector("#radius-km").value });
    if (!items.length) { showEmpty("No restaurants fit this radius and profile. Try a wider radius or review your requirements; your saved profile has not been changed."); setStatus("No potential matches found."); return; }
    renderList(items); setStatus(`${items.length} potential ${items.length === 1 ? "match" : "matches"}, ranked by profile fit.`);
  } catch (error) { showError(error instanceof Error ? error.message : "Matches could not be loaded."); setStatus("The search could not be completed."); }
  finally { setBusy(false); }
}
profileForm.addEventListener("submit", async (event) => { event.preventDefault(); try { await source.save(readProfile()); setProfileMessage("Profile saved in this browser."); } catch (error) { setProfileMessage(error instanceof Error ? error.message : "The profile could not be saved."); } });
profileForm.addEventListener("click", (event) => { const choice = event.target.closest("[data-profile-target]"); if (choice) toggleProfileChoice(choice); });
clearProfileAction.addEventListener("click", async () => { await source.save(null); clearProfileFields(); setProfileMessage("Profile cleared from this browser."); });
findAction.addEventListener("click", findMatches);
showAllAction.addEventListener("click", () => setResultExpansion(showAllAction.getAttribute("aria-expanded") !== "true"));
currentLocationAction.addEventListener("click", async () => {
  if (currentLocation) { currentLocation = null; setCurrentLocationActive(false); setLocationMessage("Prepared location restored. Current coordinates are no longer being used."); return; }
  setLocationBusy(true); setLocationMessage("Your browser may ask for permission. The coordinates are used only for this page session.");
  try { currentLocation = await source.currentLocation(); setCurrentLocationActive(true); setLocationMessage("Current location is active for approximate distance only. Your coordinates are not saved.", "success"); await findMatches(); }
  catch (error) { currentLocation = null; setCurrentLocationActive(false); setLocationMessage(error instanceof Error ? error.message : "Current location is unavailable. Continue with the prepared location.", "error"); }
  finally { setLocationBusy(false); }
});
manualLocation.addEventListener("change", () => { currentLocation = null; setCurrentLocationActive(false); setLocationMessage("Prepared location selected. Current coordinates are not being used."); });
async function start() { try { renderProfileChoices(config.profileChoices); renderLocations(await source.locations()); setRadiusValue(config.defaultRadiusKm); const savedProfiles = await source.list(); if (savedProfiles.length) { fillProfile(savedProfiles[0]); setProfileMessage("Saved profile restored from this browser."); } } catch { showError("The Burgas locations could not be loaded. Please refresh and try again."); } }
start();
