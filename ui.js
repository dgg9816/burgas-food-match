import { config } from "./config.js";

const mainAction = document.querySelector("#find-matches");
const workingIndicator = document.querySelector("#working-indicator");
const status = document.querySelector("#status");
const results = document.querySelector("#results");
const currentLocationAction = document.querySelector("#use-current-location");
const showAllAction = document.querySelector("#show-all-matches");
const profileFieldIds = Object.freeze({ allergies: "allergies", dietaryRules: "dietary-rules", dislikedIngredients: "disliked-ingredients", preferredCuisines: "preferred-cuisines", spiceTolerance: "spice-tolerance", favoriteFoods: "favorite-foods" });
const profileChoiceIds = Object.freeze({ allergies: "allergy-choices", dietaryRules: "dietary-choices", dislikedIngredients: "disliked-choices", preferredCuisines: "cuisine-choices", spiceTolerance: "spice-choices", favoriteFoods: "favorite-choices" });
function element(tag, text, className = "") { const node = document.createElement(tag); node.textContent = text; if (className) node.className = className; return node; }
function makeStateCard(message, kind = "empty") { const card = element("div", "", `state-card ${kind}`); card.setAttribute("role", kind === "error" ? "alert" : "status"); card.append(element("h3", kind === "error" ? "Something went wrong" : "Nothing to show yet"), element("p", message)); return card; }
export function setBusy(isBusy) { mainAction.disabled = isBusy; currentLocationAction.disabled = isBusy; mainAction.setAttribute("aria-busy", String(isBusy)); workingIndicator.hidden = !isBusy; }
export function setStatus(message) { status.textContent = message; }
export function showError(message) { clearResults(); results.append(makeStateCard(message, "error")); }
export function showEmpty(message) { clearResults(); results.append(makeStateCard(message)); }
export function clearResults() { results.replaceChildren(); showAllAction.hidden = true; showAllAction.setAttribute("aria-expanded", "false"); }

function syncChoiceChips() {
  Object.entries(profileFieldIds).forEach(([key, fieldId]) => {
    const field = document.querySelector(`#${fieldId}`);
    const selected = key === "spiceTolerance" ? [field.value] : field.value.split(",").map((value) => value.trim().toLowerCase()).filter(Boolean);
    document.querySelectorAll(`[data-profile-target="${key}"]`).forEach((choice) => choice.setAttribute("aria-pressed", String(selected.includes(choice.dataset.profileValue))));
  });
}

export function renderProfileChoices(choices) {
  Object.entries(choices).forEach(([key, values]) => {
    const container = document.querySelector(`#${profileChoiceIds[key]}`);
    container.replaceChildren();
    values.forEach((value) => {
      const choice = element("button", value.charAt(0).toUpperCase() + value.slice(1), "choice-chip");
      choice.type = "button";
      choice.dataset.profileTarget = key;
      choice.dataset.profileValue = value;
      choice.setAttribute("aria-pressed", "false");
      container.append(choice);
    });
  });
  syncChoiceChips();
}

export function toggleProfileChoice(choice) {
  const key = choice.dataset.profileTarget;
  const value = choice.dataset.profileValue;
  const field = document.querySelector(`#${profileFieldIds[key]}`);
  if (key === "spiceTolerance") field.value = field.value === value ? "unknown" : value;
  else {
    const values = field.value.split(",").map((item) => item.trim()).filter(Boolean);
    const matchingIndex = values.findIndex((item) => item.toLowerCase() === value);
    if (matchingIndex >= 0) values.splice(matchingIndex, 1); else values.push(value);
    field.value = values.join(", ");
  }
  syncChoiceChips();
}

export function renderList(items) {
  clearResults();
  items.forEach((item, index) => {
    const card = element("article", "", `result-card${index === 0 ? " best-match" : ""}`);
    card.dataset.resultRank = String(index + 1);
    if (index >= config.topMatchCount) card.hidden = true;
    const identity = element("div", "");
    const rank = element("p", index === 0 ? "#1 match · Best Match for You" : `#${index + 1} match`, "rank-label");
    identity.append(rank, element("h3", item.name), element("p", item.address, "result-meta"));
    const meter = element("div", "", "match-meter");
    const progress = document.createElement("progress"); progress.max = config.matchPercentMaximum; progress.value = item.matchPercent; progress.setAttribute("aria-label", `${item.matchPercent}% preference match`);
    meter.append(element("strong", `${item.matchPercent}% preference match`), progress, element("small", "Preference compatibility, not a safety score."));
    const top = element("div", "", "card-top"); top.append(identity, meter);
    const rating = item.rating == null ? "Unavailable" : `${item.rating}${item.ratingSource ? ` · ${item.ratingSource}` : ""}`;
    const facts = element("div", "", "fact-grid"); [["Approx. distance", `${item.distanceKm.toFixed(1)} km`], ["Price", item.priceLevel ? "€".repeat(item.priceLevel) : "Unavailable"], ["Rating", rating], ["Hours", item.openingHours.length ? item.openingHours.join(" · ") : "Unavailable"]].forEach(([label, value]) => { const fact = element("div", "", "fact"); fact.append(element("span", label), element("strong", value)); facts.append(fact); });
    const reasons = element("ul", "", "reason-list"); item.matchReasons.forEach((reason) => reasons.append(element("li", reason)));
    const dishes = element("ul", "", "dish-list"); item.dishes.forEach((dish) => { const line = element("li", ""); line.append(element("strong", dish.name), element("small", dish.description || "Description unavailable")); dishes.append(line); });
    card.append(top, facts, element("strong", "Why it matched"), reasons, element("strong", "Potential dishes"), dishes);
    if (item.warnings.length) { const warning = element("div", "", "warning-box"); const list = element("ul", "", "warning-list"); item.warnings.forEach((message) => list.append(element("li", message))); warning.append(element("strong", "Information incomplete"), list); card.append(warning); }
    card.append(element("p", item.verificationNote), element("p", `Last checked ${item.lastChecked}`, "result-meta"));
    const sources = element("ul", "", "source-list"); [...new Set(item.dishes.map((dish) => dish.sourceUrl))].forEach((url, index) => { const line = element("li", ""); const link = element("a", `Menu source ${index + 1}`); link.href = url; link.target = "_blank"; link.rel = "noopener noreferrer"; line.append(link); sources.append(line); });
    const directions = element("a", "Get directions", "directions"); directions.href = item.directionsUrl; directions.target = "_blank"; directions.rel = "noopener noreferrer"; card.append(sources, directions); results.append(card);
  });
  showAllAction.hidden = items.length <= config.topMatchCount;
  showAllAction.textContent = `View all ${items.length} matches`;
  showAllAction.setAttribute("aria-expanded", "false");
}
export function setResultExpansion(isExpanded) { results.querySelectorAll("[data-result-rank]").forEach((card, index) => { if (index >= config.topMatchCount) card.hidden = !isExpanded; }); showAllAction.setAttribute("aria-expanded", String(isExpanded)); showAllAction.textContent = isExpanded ? `Show top ${config.topMatchCount}` : `View all ${results.children.length} matches`; }
export function renderLocations(locations) { const select = document.querySelector("#manual-location"); select.replaceChildren(); locations.forEach((location) => { const option = element("option", location.label); option.value = location.id; select.append(option); }); }
export function fillProfile(profile) { Object.entries(profileFieldIds).forEach(([key, id]) => { document.querySelector(`#${id}`).value = Array.isArray(profile[key]) ? profile[key].join(", ") : profile[key]; }); syncChoiceChips(); }
export function clearProfileFields() { fillProfile({ allergies: [], dietaryRules: [], dislikedIngredients: [], preferredCuisines: [], spiceTolerance: "unknown", favoriteFoods: [] }); }
export function setProfileMessage(message) { document.querySelector("#profile-message").textContent = message; }
export function setRadiusValue(radiusKm) { document.querySelector("#radius-km").value = String(radiusKm); }
export function setLocationBusy(isBusy) { currentLocationAction.disabled = isBusy; mainAction.disabled = isBusy; currentLocationAction.setAttribute("aria-busy", String(isBusy)); }
export function setLocationMessage(message, kind = "status") { const locationMessage = document.querySelector("#location-message"); locationMessage.textContent = message; locationMessage.className = `location-message ${kind}`; }
export function setCurrentLocationActive(isActive) { currentLocationAction.setAttribute("aria-pressed", String(isActive)); currentLocationAction.textContent = isActive ? "Use Prepared Location Instead" : "Use My Current Location"; }
