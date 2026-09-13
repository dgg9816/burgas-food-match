const mainAction = document.querySelector("#main-action");
const workingIndicator = document.querySelector("#working-indicator");
const status = document.querySelector("#status");
const results = document.querySelector("#results");

function makeStateCard(message, kind = "empty") {
  const card = document.createElement("div");
  card.className = `state-card ${kind}`;
  card.setAttribute("role", kind === "error" ? "alert" : "status");

  const heading = document.createElement("h3");
  heading.textContent = kind === "error" ? "Something went wrong" : "Nothing to show yet";
  const copy = document.createElement("p");
  copy.textContent = message;
  card.append(heading, copy);
  return card;
}

export function setBusy(isBusy) {
  mainAction.disabled = isBusy;
  mainAction.setAttribute("aria-busy", String(isBusy));
  workingIndicator.hidden = !isBusy;
}

export function setStatus(message) {
  status.textContent = message;
}

export function showError(message) {
  clearResults();
  results.append(makeStateCard(message, "error"));
}

export function showEmpty(message) {
  clearResults();
  results.append(makeStateCard(message));
}

export function renderList(items) {
  clearResults();

  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "result-card";

    const heading = document.createElement("h3");
    heading.textContent = item.name;
    const address = document.createElement("p");
    address.className = "result-meta";
    address.textContent = item.address;
    const note = document.createElement("p");
    note.textContent = item.verificationNote;
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = item.matchReasons[0] || "Sample result";

    card.append(heading, address, note, tag);
    results.append(card);
  });
}

export function clearResults() {
  results.replaceChildren();
}
