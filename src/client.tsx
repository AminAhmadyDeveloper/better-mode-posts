import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@/styles/index.css";
import App from "@/app";

hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
