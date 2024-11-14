import App from "@/app";
import {
  type RenderToPipeableStreamOptions,
  renderToPipeableStream,
} from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

export function render(
  _url: string,
  _ssrManifest?: string,
  options?: RenderToPipeableStreamOptions
) {
  const absoluteUrl = _url.startsWith("/") ? _url : `/${_url}`;

  return renderToPipeableStream(
    <StaticRouter location={absoluteUrl}>
      <App />
    </StaticRouter>,
    options
  );
}
