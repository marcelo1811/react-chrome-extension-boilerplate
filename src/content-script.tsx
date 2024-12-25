import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ContentApp from "./ContentApp";

function createConversaProContainer() {
  const appDiv = document.getElementById("app");
  if (!appDiv) {
    return;
  }
  appDiv.style.width = "calc(100vw - 300px)";
  appDiv.style.height = "100vh";

  const shadowHost = document.querySelector('[id*="mount"]')!;
  const shadowRoot = shadowHost.attachShadow({ mode: "open" });

  const conversaProContainer = document.createElement("div");
  conversaProContainer.id = "conversa-pro-container";
  conversaProContainer.style.position = "absolute";
  conversaProContainer.style.width = "300px";
  conversaProContainer.style.height = "100vh";
  conversaProContainer.style.top = "0";
  conversaProContainer.style.right = "0";
  shadowRoot.appendChild(conversaProContainer);
  shadowRoot.appendChild(document.createElement('slot'));

  createRoot(conversaProContainer).render(
    <StrictMode>
      <ContentApp />
    </StrictMode>
  );
}

(() => {
  function observeDOM() {
    const observer = new MutationObserver(() => {
      const messageInput = document
        .querySelector("#main")
        ?.querySelector('div[contenteditable="true"]');
      if (messageInput) {
        createConversaProContainer();
        observer.disconnect();
      }
    });

    // Start observing the DOM for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
  observeDOM();
})();
