import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ContentApp from "./ContentApp";
import { Provider } from "./components/ui/provider";
import { STORAGE_KEYS } from "./constants/storage-keys";

function mountContentApp() {
  const appDiv = document.getElementById("app");
  if (!appDiv) {
    return;
  }
  appDiv.style.width = "calc(100vw - 300px)";
  appDiv.style.height = "100vh";

  const shadowHost = document.querySelector('[id*="mount"]')!;
  let shadowRoot = shadowHost.shadowRoot;
  if (!shadowRoot) {
    shadowRoot = shadowHost.attachShadow({ mode: "open" });
    shadowRoot.appendChild(document.createElement("slot"));
  }

  const contentappContainer = document.createElement("div");
  contentappContainer.id = "content-app-container";
  contentappContainer.style.position = "absolute";
  contentappContainer.style.width = "300px";
  contentappContainer.style.height = "100vh";
  contentappContainer.style.top = "0";
  contentappContainer.style.right = "0";
  shadowRoot.appendChild(contentappContainer);

  createRoot(contentappContainer).render(
    <StrictMode>
      <Provider>
        <ContentApp />
      </Provider>
    </StrictMode>
  );
}

function unmountContentApp() {
  const shadowHost = document.querySelector('[id*="mount"]')!;
  if (shadowHost.shadowRoot) {
    shadowHost.shadowRoot.querySelector("#content-app-container")?.remove();
    const appDiv = document.getElementById("app")!;
    appDiv.style.width = "100vw";
  }
}

(() => {
  chrome.storage.local.get(STORAGE_KEYS.IS_ENABLED, (data) => {
    if (data[STORAGE_KEYS.IS_ENABLED]) {
      mountContentApp();
    }
  });

  chrome.storage.onChanged.addListener((changes) => {
    if (changes[STORAGE_KEYS.IS_ENABLED]) {
      if (changes[STORAGE_KEYS.IS_ENABLED].newValue) {
        mountContentApp();
      } else {
        unmountContentApp();
      }
    }
  });
})();
