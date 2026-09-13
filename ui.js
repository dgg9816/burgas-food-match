const mainAction = document.querySelector("#find-matches");
const workingIndicator = document.querySelector("#working-indicator");
const status = document.querySelector("#status");
const results = document.querySelector("#results");
function element(tag, text, className = "") { const node = document.createElement(tag); node.textContent = text; if (className) node.className = className; return node; }
function makeStateCard(message, kind = "empty") { const card = element("div", "", `state-card ${kind}`); card.setAttribute("role", kind === "error" ? "alert" : "status"); card.append(element("h3", kind === "error" ? "Something went wrong" : "Nothing to show yet"), element("p", message)); return card; }
export function setBusy(isBusy) { mainAction.disabled = isBusy; mainAction.setAttribute("aria-busy", String(isBusy)); workingIndicator.hidden = !isBusy; }
export function setStatus(message) { status.textContent = message; }
export function showError(message) { clearResults(); results.append(makeStateCard(message, "error")); }
export function showEmpty(message) { clearResults(); results.append(makeStateCard(message)); }
export function clearResults() { results.replaceChildren(); }

export function renderList(items) {
  clearResults();
  items.forEach((item) => {
    const card = element("article", "", "result-card");
    const top = element("div", "", "card-top"); const identity = element("div", ""); identity.append(element("h3", item.name), element("p", item.address, "result-meta")); top.append(identity, element("span", `${item.matchScore} match points`, "score"));
    const facts = element("div", "", "fact-grid"); [["Approx. distance", `${item.distanceKm.toFixed(1)} km`], ["Price", item.priceLevel ? "€".repeat(item.priceLevel) : "Unavailable"], ["Rating", item.rating ?? "Unavailable"], ["Hours", item.openingHours.length ? item.openingHours.join(" · ") : "Unavailable"]].forEach(([label, value]) => { const fact = element("div", "", "fact"); fact.append(element("span", label), element("strong", value)); facts.append(fact); });
    const reasons = element("ul", "", "reason-list"); item.matchReasons.forEach((reason) => reasons.append(element("li", reason)));
    const dishes = element("ul", "", "dish-list"); item.dishes.forEach((dish) => { const line = element("li", ""); line.append(element("strong", dish.name), element("small", dish.description || "Description unavailable")); dishes.append(line); });
    card.append(top, facts, element("strong", "Why it matched"), reasons, element("strong", "Potential dishes"), dishes);
    if (item.warnings.length) { const warning = element("div", "", "warning-box"); const list = element("ul", "", "warning-list"); item.warnings.forEach((message) => list.append(element("li", message))); warning.append(element("strong", "Information incomplete"), list); card.append(warning); }
    card.append(element("p", item.verificationNote), element("p", `Last checked ${item.lastChecked}`, "result-meta"));
    const sources = element("ul", "", "source-list"); [...new Set(item.dishes.map((dish) => dish.sourceUrl))].forEach((url, index) => { const line = element("li", ""); const link = element("a", `Menu source ${index + 1}`); link.href = url; link.target = "_blank"; link.rel = "noopener noreferrer"; line.append(link); sources.append(line); });
    const directions = element("a", "Get directions", "directions"); directions.href = item.directionsUrl; directions.target = "_blank"; directions.rel = "noopener noreferrer"; card.append(sources, directions); results.append(card);
  });
}
export function renderLocations(locations) { const select = document.querySelector("#manual-location"); select.replaceChildren(); locations.forEach((location) => { const option = element("option", location.label); option.value = location.id; select.append(option); }); }
export function fillProfile(profile) { const fields = { allergies: "allergies", dietaryRules: "dietary-rules", dislikedIngredients: "disliked-ingredients", preferredCuisines: "preferred-cuisines", spiceTolerance: "spice-tolerance", favoriteFoods: "favorite-foods" }; Object.entries(fields).forEach(([key, id]) => { document.querySelector(`#${id}`).value = Array.isArray(profile[key]) ? profile[key].join(", ") : profile[key]; }); }
export function clearProfileFields() { fillProfile({ allergies: [], dietaryRules: [], dislikedIngredients: [], preferredCuisines: [], spiceTolerance: "unknown", favoriteFoods: [] }); }
export function setProfileMessage(message) { document.querySelector("#profile-message").textContent = message; }
export function setRadiusValue(radiusKm) { document.querySelector("#radius-km").value = String(radiusKm); }
