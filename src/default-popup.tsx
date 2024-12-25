import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import PopupApp from "./PopupApp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PopupApp />
  </StrictMode>
);
