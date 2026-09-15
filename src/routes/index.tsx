import { createFileRoute } from "@tanstack/react-router";
import siteHtml from "../site/index.html?raw";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Projeto dos 100K | Vendas na Shopee" },
      { name: "description", content: "Projeto dos 100K com Mark Diniz: estratégias para vender na Shopee com margem, validação e escala." },
      { property: "og:title", content: "Projeto dos 100K | Vendas na Shopee" },
      { property: "og:description", content: "Aprenda com Mark Diniz a vender na Shopee com estratégia, margem e escala." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  server: {
    handlers: {
      GET: () => new Response(siteHtml, { headers: { "content-type": "text/html; charset=utf-8" } }),
    },
  },
});
