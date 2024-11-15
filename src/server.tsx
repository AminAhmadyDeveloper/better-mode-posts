import App from "@/app";
import { CookieProvider } from "@/providers/cookie-provider";
import {
  type RenderToPipeableStreamOptions,
  renderToPipeableStream,
} from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

export function render(
  _url: string,
  cookies: any,
  _ssrManifest?: string,
  options?: RenderToPipeableStreamOptions
) {
  const absoluteUrl = _url.startsWith("/") ? _url : `/${_url}`;

  return renderToPipeableStream(
    <StaticRouter location={absoluteUrl}>
      <CookieProvider cookies={cookies}>
        <App />
      </CookieProvider>
    </StaticRouter>,
    options
  );
}
