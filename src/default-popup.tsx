import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import PopupApp from "./PopupApp.tsx";

// chrome.storage.local.setAccessLevel({ accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS' });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PopupApp />
  </StrictMode>
);
