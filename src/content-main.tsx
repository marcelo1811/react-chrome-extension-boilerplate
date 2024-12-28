import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ContentApp from "./ContentApp.tsx";
import { Provider } from "./components/ui/provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div style={{ width: "100vw", height: '100vh', position: 'relative' }}>
      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "100vh",
          top: "0",
          right: "0",
        }}
      >
        <Provider>
          <ContentApp />
        </Provider>
      </div>
    </div>
  </StrictMode>
);
