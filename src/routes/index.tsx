import { createFileRoute } from "@tanstack/react-router";
import siteHtml from "../site/index.html?raw";

export const Route = createFileRoute("/")({
  server: {
    handlers: {
      GET: () =>
        new Response(siteHtml, {
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
    },
  },
});
