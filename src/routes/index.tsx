import { createFileRoute } from "@tanstack/react-router";
import siteHtml from "../site/mentoria.html?raw";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mentoria Shopee | Método Seller" },
      {
        name: "description",
        content:
          "Mentoria prática para estruturar, otimizar e escalar uma operação de vendas na Shopee.",
      },
      { property: "og:title", content: "Mentoria Shopee | Método Seller" },
      {
        property: "og:description",
        content:
          "Estratégia, operação, anúncios, margem e escala para sellers da Shopee.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  server: {
    handlers: {
      GET: () =>
        new Response(siteHtml, {
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
    },
  },
});
