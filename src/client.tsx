import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@/styles/index.css";
import App from "@/app";
import { CookieProvider } from "@/providers/cookie-provider";

hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <BrowserRouter>
    <CookieProvider cookies={getAllCookies()}>
      <App />
    </CookieProvider>
  </BrowserRouter>
);

function getAllCookies() {
  if (typeof document !== "undefined") {
    return document.cookie.split("; ").reduce((acc: any, cookie) => {
      const [key, value] = cookie.split("=");
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {});
  }
}
