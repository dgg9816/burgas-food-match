import { source } from "./source.js";
import { clearResults, renderList, setBusy, setStatus, showEmpty, showError } from "./ui.js";

const mainAction = document.querySelector("#main-action");
const emptyAction = document.querySelector("#show-empty");
const errorAction = document.querySelector("#show-error");
const clearAction = document.querySelector("#clear-demo");

async function runDemo(demoState = "result") {
  setBusy(true);
  setStatus("Preparing the foundation preview…");
  clearResults();

  try {
    const items = await source.load({ demoState });
    if (items.length === 0) {
      showEmpty("The request worked, but there are no sample matches to display.");
      setStatus("The empty state is ready.");
      return;
    }

    renderList(items);
    setStatus("One fictional result loaded successfully.");
  } catch (error) {
    showError(error instanceof Error ? error.message : "The preview could not be loaded.");
    setStatus("The readable error state is ready.");
  } finally {
    setBusy(false);
  }
}

mainAction.addEventListener("click", () => runDemo());
emptyAction.addEventListener("click", () => runDemo("empty"));
errorAction.addEventListener("click", () => runDemo("error"));
clearAction.addEventListener("click", () => {
  clearResults();
  setStatus("");
});
